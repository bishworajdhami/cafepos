import React from 'react';
import './SkeletonBase.css';

/**
 * StaffSkeleton
 * Mimics: StaffPermissions page
 * Layout: Grid of staff-card ghosts (avatar + name + email + role badge + 2 action buttons)
 */
export default function StaffSkeleton({ count = 6 }) {
  return (
    <div className="skel-page-wrapper">
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem',
      }}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}>
            {/* Card header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}>
              {/* Avatar */}
              <span className="skel skel-circle" style={{ width: '56px', height: '56px', flexShrink: 0 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>
                {/* Name */}
                <span className="skel skel-md" style={{ width: '120px' }} />
                {/* Email */}
                <span className="skel skel-sm" style={{ width: '160px' }} />
                {/* Role badge */}
                <span className="skel skel-sm" style={{ width: '70px', borderRadius: '9999px', marginTop: '0.2rem' }} />
              </div>
            </div>
            {/* Card actions */}
            <div style={{
              display: 'flex',
              gap: '0.75rem',
              paddingTop: '1.25rem',
              borderTop: '1px dashed var(--color-border)',
            }}>
              <span className="skel" style={{ flex: 1, height: '36px', borderRadius: 'var(--radius-md)' }} />
              <span className="skel" style={{ flex: 1, height: '36px', borderRadius: 'var(--radius-md)' }} />
              <span className="skel" style={{ flex: 1, height: '36px', borderRadius: 'var(--radius-md)' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
