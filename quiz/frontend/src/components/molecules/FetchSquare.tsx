import React, { useEffect, useState } from 'react';
import Square from '../atoms/Square';
import { container, ContainerProps } from '../component';
import axios from 'axios';
import { Quiz } from '../objects/Entities';

type ComponentProps = {}
type PresenterProps = {
    quizname: string
}
const FetchSquarePresenter: React.FC<PresenterProps> = (props) => (
    <Square text={props.quizname} width={40} height={6}/>
)

const FetchSquareContainer: React.FC<ContainerProps<ComponentProps, PresenterProps>> = (props) => {
    const [quizes, setQuizes] = useState(new Array<Quiz>(2))

    useEffect(() => {
        axios.get('/api/quizget')
        .then(response => setQuizes(response.data))
        .catch(error => console.log(error))        
    }, [])

    let quizname = ""
    quizes.map(quiz => {
        quizname += quiz.quizText
    })

    return props.presenter({quizname: quizname, ...props})
}

const FetchSquare: React.FC<ComponentProps> = container<ComponentProps, PresenterProps>(
    FetchSquareContainer,
    FetchSquarePresenter
)

export default FetchSquare;
