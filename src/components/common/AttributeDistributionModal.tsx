import Modal from './Modal'

interface AttributeDistributionModalProps {
  isOpen: boolean
  onClose: () => void
  attributeName: string
  records: string
  fillRate: number
}

const AttributeDistributionModal = ({
  isOpen,
  onClose,
  attributeName,
  records,
  fillRate,
}: AttributeDistributionModalProps) => {
  // Mock distribution data - in real app, this would come from API
  const distributionData = [
    { label: 'Category A', value: 35, color: '#3b82f6' },
    { label: 'Category B', value: 25, color: '#8b5cf6' },
    { label: 'Category C', value: 20, color: '#10b981' },
    { label: 'Category D', value: 15, color: '#f59e0b' },
    { label: 'Other', value: 5, color: '#ef4444' },
  ]

  const total = distributionData.reduce((sum, item) => sum + item.value, 0)

  // Calculate angles for pie chart
  let currentAngle = -90 // Start from top
  const segments = distributionData.map((item) => {
    const percentage = (item.value / total) * 100
    const angle = (item.value / total) * 360
    const startAngle = currentAngle
    const endAngle = currentAngle + angle
    currentAngle = endAngle

    // Calculate path for pie segment
    const largeArcFlag = angle > 180 ? 1 : 0
    const x1 = 100 + 80 * Math.cos((startAngle * Math.PI) / 180)
    const y1 = 100 + 80 * Math.sin((startAngle * Math.PI) / 180)
    const x2 = 100 + 80 * Math.cos((endAngle * Math.PI) / 180)
    const y2 = 100 + 80 * Math.sin((endAngle * Math.PI) / 180)

    return {
      ...item,
      percentage,
      path: `M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2} Z`,
      startAngle,
      endAngle,
    }
  })

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${attributeName} Distribution`}
      subtitle={`${records} records • ${fillRate.toFixed(1)}% fill rate`}
    >
      <div className="attribute-distribution-content">
        <div className="attribute-distribution-chart-container">
          {/* Pie Chart */}
          <div className="attribute-distribution-chart">
            <svg width="200" height="200" viewBox="0 0 200 200">
              {segments.map((segment, index) => (
                <g key={index}>
                  <path
                    d={segment.path}
                    fill={segment.color}
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="attribute-distribution-segment"
                  />
                  {/* Percentage label */}
                  {segment.percentage > 5 && (
                    <text
                      x={100 + 50 * Math.cos(((segment.startAngle + segment.endAngle) / 2 * Math.PI) / 180)}
                      y={100 + 50 * Math.sin(((segment.startAngle + segment.endAngle) / 2 * Math.PI) / 180)}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#ffffff"
                      fontSize="12"
                      fontWeight="600"
                    >
                      {segment.percentage.toFixed(0)}%
                    </text>
                  )}
                </g>
              ))}
            </svg>
          </div>

          {/* Legend */}
          <div className="attribute-distribution-legend">
            <h4 className="attribute-distribution-legend-title">Distribution</h4>
            <div className="attribute-distribution-legend-list">
              {distributionData.map((item, index) => {
                const percentage = (item.value / total) * 100
                return (
                  <div key={index} className="attribute-distribution-legend-item">
                    <div className="attribute-distribution-legend-color" style={{ backgroundColor: item.color }} />
                    <div className="attribute-distribution-legend-content">
                      <div className="attribute-distribution-legend-label">{item.label}</div>
                      <div className="attribute-distribution-legend-value">
                        {item.value.toLocaleString()} ({percentage.toFixed(1)}%)
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="attribute-distribution-stats">
          <div className="attribute-distribution-stat">
            <div className="attribute-distribution-stat-label">Total Records</div>
            <div className="attribute-distribution-stat-value">{records}</div>
          </div>
          <div className="attribute-distribution-stat">
            <div className="attribute-distribution-stat-label">Fill Rate</div>
            <div className="attribute-distribution-stat-value">{fillRate.toFixed(1)}%</div>
          </div>
          <div className="attribute-distribution-stat">
            <div className="attribute-distribution-stat-label">Categories</div>
            <div className="attribute-distribution-stat-value">{distributionData.length}</div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default AttributeDistributionModal
