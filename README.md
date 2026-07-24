# Monis Workspace Builder

An interactive workspace configurator built for Monis.rent, allowing digital nomads in Bali to visually design and rent their ideal office setup.

## Approach & Tech Choices

I wanted to make the experience feel more like a fun sandbox or a room planner rather than just scrolling through a standard e-commerce catalog. I built the foundation with **Next.js** and **Tailwind CSS** because it allows for fast prototyping and clean, maintainable styling. 

Instead of using raw JPEG/PNG product images (which often have messy backgrounds or weird perspectives), I built the items using SVG components. This keeps the design ultra-clean, transparent, and scalable. For the drag-and-drop interactions, I used **GSAP (specifically GSAP Draggable)**. It handles physics, bounds, and smooth animations much better than standard HTML5 drag-and-drop, making the 3D isometric stage feel responsive and alive.

## What I'd improve with more time

- **Smart Snapping**: I'd love to add a snapping system so monitors automatically snap onto the center of the desk, and chairs align perfectly when dragged close to them.
- **Dynamic Z-Index (Depth Sorting)**: Right now, z-index is tied to the item's category (monitors are always above desks). With more time, I'd calculate the z-index based on the item's Y-coordinate so things naturally fall "behind" or "in front" of each other dynamically.
- **Item Rotation**: Letting users rotate items (like angling a plant in the corner or placing a side table) for more realistic room layouts.
- **Backend Integration**: Wiring up the checkout form to a real database, adding Stripe for payments, and letting users save their workspace drafts to an account.

## Running Locally

```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the app.
