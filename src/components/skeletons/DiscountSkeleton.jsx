import React from 'react';
import './SkeletonBase.css';

/**
 * DiscountSkeleton
 * Mimics: DiscountSetup page
 * Layout: Grid of discount cards (name + badges + item tag pills + 3-button footer)
 */
export default function DiscountSkeleton({ count = 4 }) {
  return (
    <div className="skel-page-wrapper">
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.25rem',
      }}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}>
            {/* 1. Header Row */}
            <div style={{
              padding: '1rem 1.25rem',
              background: 'var(--color-surface-alt)',
              borderBottom: '1px solid var(--color-border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>
                <span className="skel skel-xs" style={{ width: '40%' }} />
                <span className="skel skel-md" style={{ width: '70%' }} />
              </div>
              <span className="skel skel-sm" style={{ width: '80px', borderRadius: '2rem' }} />
            </div>

            {/* 2. Meta Row */}
            <div style={{
              padding: '0.75rem 1.25rem',
              background: 'var(--color-surface)',
              borderBottom: '1px dashed var(--color-border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <span className="skel skel-sm" style={{ width: '100px', borderRadius: '0.5rem' }} />
              <span className="skel skel-md" style={{ width: '80px', borderRadius: '0.5rem' }} />
            </div>

            {/* 3. Body Content */}
            <div style={{
              padding: '1.25rem',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}>
              {/* Description box */}
              <span className="skel" style={{ height: '48px', borderRadius: '0.75rem', width: '100%' }} />
              
              {/* Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <span className="skel skel-xs" style={{ width: '120px' }} />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {Array.from({ length: 4 }).map((_, ti) => (
                    <span key={ti} className="skel skel-sm" style={{ width: `${50 + (ti * 10)}px`, borderRadius: '0.35rem' }} />
                  ))}
                </div>
              </div>
            </div>

            {/* 4. Footer Actions */}
            <div style={{
              padding: '1rem 1.25rem',
              background: 'var(--color-surface-alt)',
              borderTop: '1px solid var(--color-border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <span className="skel skel-circle" style={{ width: '40px', height: '40px' }} />
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <span className="skel" style={{ width: '72px', height: '36px', borderRadius: '0.6rem' }} />
                <span className="skel" style={{ width: '40px', height: '36px', borderRadius: '0.6rem' }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
