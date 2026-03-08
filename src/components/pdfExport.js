// ── NikiBhavi Universal PDF Export Utility ──────────────────
// Uses browser print + styled HTML — no external library needed
// Works on all devices, mobile + desktop

export const BRAND = {
  name: 'NikiBhavi',
  sub: 'Malaysia Guide for Indians',
  url: 'nikibhavi.msdevbuild.com',
  color: '#C9F53B',
  ink: '#0d0d0d',
}

// ── Core PDF renderer ─────────────────────────────────────────
export function renderPDF(title, subtitle, sections, meta = {}) {
  const now = new Date().toLocaleDateString('en-MY', {
    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
  })

  const renderSection = (sec) => {
    if (sec.type === 'summary') {
      // Big KPI boxes
      const boxes = sec.items.map(item => `
        <div style="background:${item.highlight ? '#0d0d0d' : '#f8f9fb'};border-radius:12px;padding:16px;text-align:center;border:1.5px solid ${item.highlight ? 'transparent' : '#e4e6eb'};">
          <div style="font-size:11px;color:${item.highlight ? 'rgba(255,255,255,.5)' : '#9ba3b5'};margin-bottom:6px;text-transform:uppercase;letter-spacing:.5px;">${item.label}</div>
          <div style="font-size:22px;font-weight:900;color:${item.highlight ? '#C9F53B' : '#0d0d0d'};">${item.value}</div>
          ${item.sub ? `<div style="font-size:11px;color:${item.highlight ? 'rgba(255,255,255,.5)' : '#9ba3b5'};margin-top:3px;">${item.sub}</div>` : ''}
        </div>`).join('')
      return `
        <div style="margin-bottom:20px;">
          ${sec.title ? `<div style="font-size:13px;font-weight:800;color:#9ba3b5;text-transform:uppercase;letter-spacing:.6px;margin-bottom:10px;">${sec.title}</div>` : ''}
          <div style="display:grid;grid-template-columns:repeat(${Math.min(sec.items.length, 4)},1fr);gap:10px;">
            ${boxes}
          </div>
        </div>`
    }

    if (sec.type === 'table') {
      const headerCells = sec.headers.map(h =>
        `<th style="padding:10px 12px;text-align:${h.align||'left'};font-size:12px;font-weight:800;color:#fff;white-space:nowrap;">${h.label}</th>`
      ).join('')
      const rows = sec.rows.map((row, ri) => {
        const cells = row.map((cell, ci) => {
          const align = sec.headers[ci]?.align || 'left'
          const bold  = sec.headers[ci]?.bold
          const color = cell?.color || (bold ? '#0d0d0d' : '#374151')
          const val   = typeof cell === 'object' ? cell.value : cell
          return `<td style="padding:9px 12px;text-align:${align};font-size:13px;color:${color};font-weight:${bold?700:400};">${val}</td>`
        }).join('')
        const bg = ri % 2 === 0 ? '#fff' : '#f8f9fb'
        return `<tr style="background:${bg};">${cells}</tr>`
      }).join('')
      return `
        <div style="margin-bottom:20px;">
          ${sec.title ? `<div style="font-size:15px;font-weight:800;color:#0d0d0d;margin-bottom:10px;padding-bottom:8px;border-bottom:2px solid #e4e6eb;">${sec.title}</div>` : ''}
          <table style="width:100%;border-collapse:collapse;border-radius:12px;overflow:hidden;">
            <thead><tr style="background:#0d0d0d;">${headerCells}</tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>`
    }

    if (sec.type === 'bars') {
      const maxVal = Math.max(...sec.items.map(i => i.value || 0), 1)
      const barsHtml = sec.items.map(item => {
        const pct = Math.max(2, Math.round((item.value / maxVal) * 100))
        const isOver = item.over
        return `
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
            <div style="width:130px;font-size:12px;color:#374151;flex-shrink:0;">${item.icon||''} ${item.label}</div>
            <div style="flex:1;background:#f0f2f5;border-radius:6px;height:18px;overflow:hidden;">
              <div style="height:100%;width:${pct}%;background:${isOver ? '#ef4444' : '#C9F53B'};border-radius:6px;"></div>
            </div>
            <div style="width:90px;text-align:right;font-size:12px;font-weight:700;color:${isOver ? '#ef4444' : '#0d0d0d'};">${item.display}</div>
          </div>`
      }).join('')
      return `
        <div style="margin-bottom:20px;">
          ${sec.title ? `<div style="font-size:15px;font-weight:800;color:#0d0d0d;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid #e4e6eb;">${sec.title}</div>` : ''}
          ${barsHtml}
        </div>`
    }

    if (sec.type === 'keyvalue') {
      const rows = sec.items.map(item => `
        <div style="display:flex;justify-content:space-between;align-items:baseline;padding:8px 0;border-bottom:1px solid #f0f2f5;">
          <span style="font-size:13px;color:#65697a;">${item.label}</span>
          <span style="font-size:14px;font-weight:${item.bold?800:600};color:${item.color||'#0d0d0d'};">${item.value}</span>
        </div>`).join('')
      return `
        <div style="background:#fff;border-radius:12px;padding:16px 20px;border:1.5px solid #e4e6eb;margin-bottom:20px;">
          ${sec.title ? `<div style="font-size:15px;font-weight:800;color:#0d0d0d;margin-bottom:10px;">${sec.title}</div>` : ''}
          ${rows}
        </div>`
    }

    if (sec.type === 'alert') {
      const colors = { green:'#16a34a', red:'#dc2626', amber:'#d97706', blue:'#2563eb' }
      const c = colors[sec.color] || colors.blue
      return `
        <div style="background:${c}18;border:2px solid ${c}40;border-radius:12px;padding:14px 16px;margin-bottom:16px;">
          <div style="font-size:14px;font-weight:800;color:${c};">${sec.icon||''} ${sec.title}</div>
          ${sec.text ? `<div style="font-size:13px;color:#374151;margin-top:5px;line-height:1.5;">${sec.text}</div>` : ''}
        </div>`
    }

    return ''
  }

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${BRAND.name} — ${title}</title>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; background:#fff; color:#0d0d0d; line-height:1.5; }
  @page { margin: 16mm 14mm; }
  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .no-print { display:none !important; }
    .page-break { page-break-before: always; }
  }
</style>
</head>
<body style="padding:0;max-width:800px;margin:0 auto;">

  <!-- Header -->
  <div style="background:#0d0d0d;border-radius:16px;padding:20px 24px;margin-bottom:20px;display:flex;justify-content:space-between;align-items:center;">
    <div>
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
        <span style="font-size:22px;">🇲🇾</span>
        <span style="font-size:18px;font-weight:900;color:#fff;">${BRAND.name}</span>
        <span style="font-size:11px;color:rgba(255,255,255,.4);border:1px solid rgba(255,255,255,.15);padding:2px 8px;border-radius:10px;">${BRAND.sub}</span>
      </div>
      <div style="font-size:24px;font-weight:900;color:#C9F53B;">${title}</div>
      ${subtitle ? `<div style="font-size:13px;color:rgba(255,255,255,.5);margin-top:3px;">${subtitle}</div>` : ''}
    </div>
    <div style="text-align:right;">
      <div style="font-size:11px;color:rgba(255,255,255,.35);">Generated</div>
      <div style="font-size:12px;color:rgba(255,255,255,.6);margin-top:2px;">${now}</div>
      <div style="font-size:11px;color:rgba(255,255,255,.3);margin-top:4px;">${BRAND.url}</div>
    </div>
  </div>

  ${meta.alert ? `
  <div style="background:rgba(201,245,59,.08);border:1.5px solid rgba(201,245,59,.3);border-radius:12px;padding:12px 16px;margin-bottom:20px;display:flex;align-items:center;gap:10px;">
    <span style="font-size:18px;">⚠️</span>
    <span style="font-size:12px;color:#374151;">${meta.alert}</span>
  </div>` : ''}

  <!-- Content -->
  ${sections.map(renderSection).join('')}

  <!-- Footer -->
  <div style="margin-top:24px;padding-top:16px;border-top:1.5px solid #e4e6eb;display:flex;justify-content:space-between;align-items:center;">
    <div style="font-size:11px;color:#9ba3b5;">📊 Generated by ${BRAND.name} · ${BRAND.url}</div>
    <div style="font-size:11px;color:#9ba3b5;">⚠️ Estimates only — verify with official sources</div>
  </div>

  <!-- Print button (hidden when printing) -->
  <div class="no-print" style="position:fixed;bottom:24px;right:24px;">
    <button onclick="window.print()" style="background:#0d0d0d;color:#C9F53B;border:none;border-radius:12px;padding:12px 24px;font-size:14px;font-weight:700;cursor:pointer;box-shadow:0 4px 20px rgba(0,0,0,.2);">
      🖨️ Print / Save as PDF
    </button>
  </div>

</body>
</html>`

  const win = window.open('', '_blank')
  win.document.write(html)
  win.document.close()
  setTimeout(() => win.print(), 400)
}

// ── Convenience: open print dialog directly ────────────────────
export function triggerPrint(win) {
  setTimeout(() => win.print(), 500)
}
