# Spring-Back Draggable Elements

A demonstration of interactive drag mechanics with spring-back animation using [Framer Motion](https://www.framer.com/motion/) and [Next.js](https://nextjs.org).


## Features

- **Click-to-Enable Mechanics**: Click any element 5 times to enable dragging
- **Spring-Back Animation**: All draggable elements return to their original position with customizable spring physics
- **Global Toggle**: Use the toggle switch to enable dragging for all elements at once
- **Varied Physics Settings**: Five different spring configurations to demonstrate different elasticity, damping and strength values
- **Responsive Design**: Works on both desktop and mobile devices

## How It Works

This project demonstrates advanced Framer Motion techniques:

- Custom click tracking for conditional dragging
- Spring physics configuration with customizable parameters
- State management with React Context
- Dynamic feedback during interaction
- Event handling for drag gestures

Elements become draggable either after 5 consecutive clicks or by enabling the global toggle. When released, elements gracefully spring back to their original position with configurable physics parameters.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Spring Configuration Options

Each draggable element demonstrates different spring behavior:

1. **Basic Spring**: Balanced spring (300 strength, 25 damping)
2. **Bouncy Spring**: Softer spring with more bounce (400 strength, 15 damping)
3. **Strong Spring**: Medium-strong pull back to center (600 strength, 20 damping)
4. **Fast Spring**: Quick return with minimal oscillation (800 strength, 35 damping)
5. **Elastic Bounce**: Extra bouncy animation (400 strength, 10 damping)

## Learn More

To learn more about the technologies used:

- [Framer Motion Documentation](https://www.framer.com/motion/introduction/) - learn about Framer Motion features
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
