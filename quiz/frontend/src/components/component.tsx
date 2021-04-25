import React from 'react'

export type ContainerProps<C, P> = C & { presenter: React.FC<P>}

export const container = <C, P>(Container: React.FC<ContainerProps<C, P>>, Presenter: React.FC<P>): React.FC<C> => {
    return (props) => {
        return <Container presenter={(presenterProps) => <Presenter {...presenterProps}></Presenter>}{...props}></Container>
    }
}

export const classNames = (...classNames: Array<string | undefined>) =>
  classNames.filter(Boolean).join(' ')

export type Flg = true | false