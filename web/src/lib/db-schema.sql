-- Title I Donation Platform — database schema scaffold
-- Postgres flavor. Not provisioned; kept here as the shape the mock data mirrors.

CREATE TABLE schools (
  id              TEXT PRIMARY KEY,
  name            TEXT NOT NULL,
  location        TEXT NOT NULL,
  district        TEXT NOT NULL,
  grade_range     TEXT NOT NULL,
  enrollment      INTEGER NOT NULL,
  frl_percent     INTEGER NOT NULL,
  classrooms_count INTEGER NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE systems (
  id                    TEXT PRIMARY KEY,
  school_id             TEXT NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name                  TEXT NOT NULL,
  description           TEXT NOT NULL,
  goal_usd              NUMERIC(10,2) NOT NULL,
  raised_usd            NUMERIC(10,2) NOT NULL DEFAULT 0,
  classrooms_supported  INTEGER NOT NULL,
  allocation_note       TEXT NOT NULL,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_systems_school ON systems(school_id);

CREATE TABLE classrooms (
  id          TEXT PRIMARY KEY,
  school_id   TEXT NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  teacher     TEXT NOT NULL,
  grade       TEXT NOT NULL,
  students    INTEGER NOT NULL,
  narrative   TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_classrooms_school ON classrooms(school_id);

CREATE TABLE classroom_system_progress (
  classroom_id TEXT NOT NULL REFERENCES classrooms(id) ON DELETE CASCADE,
  system_id    TEXT NOT NULL REFERENCES systems(id) ON DELETE CASCADE,
  pct          INTEGER NOT NULL,
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (classroom_id, system_id)
);

CREATE TABLE items (
  id                 TEXT PRIMARY KEY,
  school_id          TEXT NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  classroom_id       TEXT NOT NULL REFERENCES classrooms(id) ON DELETE CASCADE,
  system_id          TEXT NOT NULL REFERENCES systems(id) ON DELETE CASCADE,
  name               TEXT NOT NULL,
  unit_cost          NUMERIC(10,2) NOT NULL,
  quantity_needed    INTEGER NOT NULL,
  quantity_fulfilled INTEGER NOT NULL DEFAULT 0,
  why_it_matters     TEXT NOT NULL,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_items_system    ON items(system_id);
CREATE INDEX idx_items_classroom ON items(classroom_id);

CREATE TABLE donations (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id   TEXT NOT NULL REFERENCES schools(id),
  amount_usd  NUMERIC(10,2) NOT NULL CHECK (amount_usd > 0),
  mode        TEXT NOT NULL CHECK (mode IN ('system','item','greatest-need')),
  system_id   TEXT REFERENCES systems(id),
  item_id     TEXT REFERENCES items(id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE donation_allocations (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donation_id  UUID NOT NULL REFERENCES donations(id) ON DELETE CASCADE,
  system_id    TEXT NOT NULL REFERENCES systems(id),
  pct          INTEGER NOT NULL,
  usd          NUMERIC(10,2) NOT NULL
);
CREATE INDEX idx_alloc_donation ON donation_allocations(donation_id);

CREATE TABLE item_fulfillments (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id        TEXT NOT NULL REFERENCES items(id),
  donation_id    UUID REFERENCES donations(id),
  quantity       INTEGER NOT NULL CHECK (quantity > 0),
  fulfilled_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
