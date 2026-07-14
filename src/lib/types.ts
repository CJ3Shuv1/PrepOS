export type UiStyle = "glass" | "solid";

export type Profile = {
  user_id: string;
  name: string | null;
  age: number | null;
  height: number | null;
  phase: string | null;
  coaching_start: string | null;
};

export type MacroTarget = {
  id: string;
  user_id: string;
  day_type: "training" | "rest";
  kcal: number | null;
  protein: number | null;
  carbs: number | null;
  fett: number | null;
};

export type TrainingDay = {
  id: string;
  user_id: string;
  key: string;
  label: string;
  sub: string | null;
  position: number;
};

export type Exercise = {
  id: string;
  user_id: string;
  day_id: string;
  name: string;
  sets: number | null;
  rep_range: string | null;
  tempo: string | null;
  intensity: string | null;
  notes: string | null;
  position: number;
};

export type MealItem = {
  id: string;
  user_id: string;
  meal_number: number;
  variant: "primary" | "alternative";
  food_name: string;
  amount: number | null;
  unit: string | null;
  kcal: number | null;
  carbs: number | null;
  fett: number | null;
  protein: number | null;
  fiber: number | null;
  position: number;
};

export type WeightEntry = {
  id: string;
  user_id: string;
  date: string;
  weight: number;
};

export type Checkin = {
  id: string;
  user_id: string;
  date: string;
  sleep_hours: number | null;
  sleep_quality: number | null;
  energy_level: number | null;
  stress_level: number | null;
  hunger: number | null;
  digestion: number | null;
  steps: number | null;
  cardio_minutes: number | null;
  soreness: number | null;
  notes: string | null;
};
