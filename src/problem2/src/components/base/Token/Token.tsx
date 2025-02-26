import classNames from 'classnames'
import s from './Token.module.scss'
interface Props {
    className?: string;
    name: string;
    width?: number;
    height?: number;
}
export default function Token({
    className,
    name,
    width = 20,
    height = 20,
}: Props) {
    return (
        <img
            width={width}
            height={height}
            className={classNames(className, s.icon)}
            alt={name}
            src={`/images/tokens/${name}.svg`}
        />
    )
}