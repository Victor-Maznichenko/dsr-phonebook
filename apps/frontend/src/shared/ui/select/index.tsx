import type { ComponentProps } from "react"
import { Condition } from "../condition"
import { Icons } from "../icons"
import styles from './styles.module.scss'
import clsx from "clsx";



export const Select = ({ src, variant = 'circle', text, ...props }: AvatarProps) => (
    <div className={clsx(styles.avatar, variant && styles[variant])}>
        <Condition 
         value={src}
         then={<img className={styles.img} src={src} {...props} />} 
         else={
            <Condition value={text} then={'TR'} else={<Icons.User className={styles.icon} />} />
         } 
         />
    </div>
  )
