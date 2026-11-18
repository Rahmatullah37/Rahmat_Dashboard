import type { ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const item: Variants = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } } };

/** Wrap a grid/list in <Stagger> and each child in <Item> for a cascading entrance. */
export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return <motion.div className={className} variants={container} initial="hidden" animate="show">{children}</motion.div>;
}
export function Item({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <motion.div className={`h-full ${className}`} variants={item}>{children}</motion.div>;
}
