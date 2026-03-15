import type { ComponentProps } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

export const Root = ({ className, ...props }: ComponentProps<'table'>) => <table className={clsx(styles.table, className)} {...props}></table>;
export const THead = ({ className, ...props }: ComponentProps<'thead'>) => <thead className={clsx(styles.thead, className)} {...props}></thead>;
export const TBody = ({ className, ...props }: ComponentProps<'tbody'>) => <tbody className={clsx(styles.tbody, className)} {...props}></tbody>;
export const Th = ({ className, ...props }: ComponentProps<'th'>) => <th className={clsx(styles.th, className)} {...props}></th>;
export const Tr = ({ className, ...props }: ComponentProps<'tr'>) => <tr className={clsx(styles.tr, className)} {...props}></tr>;
export const Td = ({ className, ...props }: ComponentProps<'td'>) => <td className={clsx(styles.td, className)} {...props}></td>;
