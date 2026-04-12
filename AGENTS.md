# Project Instructions

## Mission Section
- When the user asks to "revert the mission section", reinstate the Target Goal text and the GoalTracker component.
- Original content to reinstate:
  ```tsx
  <p className="text-steel-blue font-mono text-sm uppercase tracking-widest pt-4">
    Target Goal: $350,000 AUD
    <span className="block text-[10px] text-mint-cream/40 mt-1">Stretch goals to be revealed as the campaign progresses</span>
  </p>
  ...
  <GoalTracker current={0} goal={350000} />
  ```
