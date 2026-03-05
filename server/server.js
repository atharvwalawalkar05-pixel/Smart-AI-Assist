import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

let ProfileModel = null;
let useMongo = false;

const fallbackStore = {
  profile: {
    onboarding: { complete: false, supportNeed: '' },
    settings: {
      theme: 'light',
      highContrast: false,
      fontScale: 1,
      voice: '',
      pitch: 1,
      rate: 1
    },
    updatedAt: new Date()
  }
};

async function initMongo() {
  if (!MONGO_URI) return;
  try {
    await mongoose.connect(MONGO_URI);
    const ProfileSchema = new mongoose.Schema(
      {
        onboarding: {
          complete: Boolean,
          supportNeed: String
        },
        settings: {
          theme: String,
          highContrast: Boolean,
          fontScale: Number,
          voice: String,
          pitch: Number,
          rate: Number
        }
      },
      { timestamps: true }
    );

    ProfileModel = mongoose.model('Profile', ProfileSchema);
    useMongo = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.warn('MongoDB unavailable, using fallback store');
  }
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, persistence: useMongo ? 'mongo' : 'fallback' });
});

app.get('/api/profile', async (_req, res) => {
  if (useMongo) {
    let profile = await ProfileModel.findOne();
    if (!profile) profile = await ProfileModel.create(fallbackStore.profile);
    return res.json(profile);
  }
  return res.json(fallbackStore.profile);
});

app.post('/api/profile', async (req, res) => {
  const payload = req.body || {};

  if (useMongo) {
    const current = (await ProfileModel.findOne()) || (await ProfileModel.create(fallbackStore.profile));
    current.onboarding = payload.onboarding ?? current.onboarding;
    current.settings = payload.settings ?? current.settings;
    await current.save();
    return res.json(current);
  }

  fallbackStore.profile = {
    ...fallbackStore.profile,
    ...payload,
    updatedAt: new Date()
  };
  return res.json(fallbackStore.profile);
});

initMongo().finally(() => {
  app.listen(PORT, () => {
    console.log(`SmartAssist API running on http://localhost:${PORT}`);
  });
});
