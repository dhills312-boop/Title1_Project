'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import FadeUp from '@/components/FadeUp';
import LineReveal from '@/components/LineReveal';
import Rule from '@/components/Rule';
import { getClassroom } from '@/lib/data/classrooms';
import { getItemsForClassroom } from '@/lib/data/items';
import { getSchool } from '@/lib/data/schools';
import { getSystemsForSchool } from '@/lib/data/systems';

const DEFAULT_WISHLIST_URL = 'https://www.amazon.com/hz/wishlist/ls/206LSTGQUVA92?ref_=wl_share';
const PREVIEW_CLASSROOM_ID = 'tarver-5';
const PREVIEW_SCHOOL_ID = 'spring-hill';

export default function TeacherPreviewPage() {
  const [wishlistUrl, setWishlistUrl] = useState(DEFAULT_WISHLIST_URL);
  const classroom = getClassroom(PREVIEW_CLASSROOM_ID)!;
  const school = getSchool(PREVIEW_SCHOOL_ID)!;
  const systems = getSystemsForSchool(PREVIEW_SCHOOL_ID);
  const items = getItemsForClassroom(PREVIEW_CLASSROOM_ID);

  const parsedPreview = useMemo(() => {
    const totalUnits = items.reduce((sum, item) => sum + item.quantityNeeded, 0);
    const matchedSystems = systems.filter((system) =>
      items.some((item) => item.systemId === system.id),
    );
    return {
      totalUnits,
      matchedSystems,
      topNeeds: items.slice(0, 3),
    };
  }, [items, systems]);

  return (
    <div className="screen-enter" style={{ minHeight: '100vh', paddingTop: 60, position: 'relative' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px,6vw,80px) clamp(24px,5vw,80px)' }}>
        <FadeUp>
          <div className="eyebrow" style={{ marginBottom: 18 }}>
            Teacher-side preview
          </div>
        </FadeUp>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(28px, 6vw, 72px)',
            alignItems: 'start',
            marginBottom: 44,
          }}
        >
          <div>
            <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(40px,6vw,72px)', fontWeight: 400, lineHeight: 1.02, letterSpacing: '-0.025em', color: 'var(--ink)', marginBottom: 18 }}>
              <LineReveal delay={0.05}>Bring your</LineReveal>
              <LineReveal delay={0.14}>wishlist.</LineReveal>
              <LineReveal delay={0.23} style={{ color: 'var(--ink-muted)', fontStyle: 'italic', display: 'block' }}>
                <em>We shape the page.</em>
              </LineReveal>
            </h1>
            <FadeUp delay={0.28}>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 15, lineHeight: 1.8, color: 'var(--ink-muted)', maxWidth: 520, fontWeight: 300 }}>
                This demo starts with an Amazon wishlist link from a teacher, maps it to a seeded classroom profile, and lands on the ready-made campaign result. No database or parsing API is wired yet, so Ms. Tarver&apos;s classroom is a curated preview based on the visible wishlist categories rather than a live sync.
              </p>
            </FadeUp>
          </div>

          <FadeUp delay={0.18}>
            <div style={{ background: 'var(--bg-warm)', borderTop: '2px solid var(--ink)', padding: 'clamp(22px, 4vw, 34px)' }}>
              <div className="eyebrow" style={{ color: 'var(--ink-muted)', marginBottom: 14 }}>
                Teacher intake
              </div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 30, color: 'var(--ink)', marginBottom: 8 }}>
                {classroom.teacher}
              </div>
              <div style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.7, marginBottom: 20 }}>
                {school.name} {'\u00B7'} {classroom.grade} {'\u00B7'} {classroom.students} students
              </div>
              <label
                htmlFor="teacher-preview-wishlist"
                style={{
                  display: 'block',
                  fontFamily: 'var(--sans)',
                  fontSize: 11,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-muted)',
                  marginBottom: 10,
                }}
              >
                Amazon wishlist link
              </label>
              <input
                id="teacher-preview-wishlist"
                type="url"
                value={wishlistUrl}
                onChange={(e) => setWishlistUrl(e.target.value)}
                style={{
                  width: '100%',
                  padding: '13px 14px',
                  border: '1px solid var(--rule)',
                  background: 'rgba(255,255,255,0.44)',
                  fontFamily: 'var(--sans)',
                  fontSize: 14,
                  color: 'var(--ink)',
                  marginBottom: 14,
                }}
              />
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 22 }}>
                <a
                  href={wishlistUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-block',
                    padding: '12px 18px',
                    border: '1px solid var(--rule)',
                    color: 'var(--ink-muted)',
                    fontFamily: 'var(--sans)',
                    fontSize: 12,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  Open wishlist
                </a>
                <Link
                  href={`/schools/${school.id}/classrooms/${classroom.id}`}
                  style={{
                    display: 'inline-block',
                    padding: '12px 18px',
                    background: 'var(--ink)',
                    color: 'var(--bg)',
                    fontFamily: 'var(--sans)',
                    fontSize: 12,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  Generate preview {'\u2192'}
                </Link>
              </div>
              <div style={{ fontFamily: 'var(--sans)', fontSize: 12, lineHeight: 1.7, color: 'var(--ink-muted)' }}>
                Current demo behavior: this seeded Amazon link routes to Ms. Tarver&apos;s prebuilt classroom campaign using manually matched wishlist categories.
              </div>
            </div>
          </FadeUp>
        </div>

        <Rule />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 18,
            paddingTop: 34,
            marginBottom: 54,
          }}
        >
          {[
            [`${parsedPreview.totalUnits}`, 'seeded units represented'],
            [`${parsedPreview.matchedSystems.length}`, 'systems recognized'],
            [`${classroom.students}`, 'students impacted'],
          ].map(([value, label]) => (
            <div key={label} style={{ padding: '18px 0', borderTop: '1px solid var(--rule)' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 34, color: 'var(--ink)', marginBottom: 6 }}>{value}</div>
              <div style={{ fontFamily: 'var(--sans)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(24px, 5vw, 48px)',
            alignItems: 'start',
          }}
        >
          <FadeUp>
            <div>
              <div className="eyebrow" style={{ marginBottom: 14 }}>
                What the algorithm extracts
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {parsedPreview.matchedSystems.map((system) => (
                  <div
                    key={system.id}
                    style={{
                      padding: '16px 18px',
                      borderTop: '1px solid var(--rule)',
                      borderBottom: '1px solid var(--rule)',
                      background: 'rgba(255,255,255,0.14)',
                    }}
                  >
                    <div style={{ fontFamily: 'var(--serif)', fontSize: 22, color: 'var(--ink)', marginBottom: 6 }}>
                      {system.name}
                    </div>
                    <div style={{ fontFamily: 'var(--sans)', fontSize: 13, lineHeight: 1.7, color: 'var(--ink-muted)' }}>
                      {system.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.12}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 14 }}>
                Seeded preview items
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {parsedPreview.topNeeds.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      padding: '16px 18px',
                      borderTop: '1px solid var(--rule)',
                      borderBottom: '1px solid var(--rule)',
                    }}
                  >
                    <div style={{ fontFamily: 'var(--serif)', fontSize: 20, color: 'var(--ink)', marginBottom: 4 }}>
                      {item.name}
                    </div>
                    <div style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--ink-muted)', marginBottom: 6 }}>
                      ${item.unitCost} each {'\u00B7'} {item.quantityNeeded} needed
                    </div>
                    <div style={{ fontFamily: 'var(--sans)', fontSize: 13, lineHeight: 1.7, color: 'var(--ink-muted)' }}>
                      {item.whyItMatters}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </div>
  );
}
