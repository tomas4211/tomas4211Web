import React from 'react';
import MilestoneCard from '../milestones/MilestoneCard';
import { MILESTONES } from '../../data/projects';

const MilestonesSection: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {MILESTONES.map((milestone, i) => (
      <MilestoneCard key={milestone.id} milestone={milestone} index={i} />
    ))}
  </div>
);

export default MilestonesSection;
