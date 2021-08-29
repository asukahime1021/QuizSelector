import React from 'react'
import { useCurrentQuizCategoryContext, useCurrentQuizProgressContext, useTicketContext } from '../atoms/Context'
import { container, ContainerProps } from '../component'

type ComponentProps = {
}

type PresenterProps = {
    answerString: string
    ticketString: string
}

const InformationAreaPresenter: React.FC<PresenterProps> = ({answerString, ticketString}) => (
    <div style={{marginTop: "3vh"}}>
        <p>
            {answerString}
        </p>
        <p>
            {ticketString}
        </p>
    </div>
)

const InformationAreaContainer: React.FC<ContainerProps<ComponentProps, PresenterProps>> = ({presenter, ...props}) => {
    const {currentQuizCategory} = useCurrentQuizCategoryContext()
    const {currentQuizProgress} = useCurrentQuizProgressContext()
    const ticket = useTicketContext().ticket
    const categoryId = currentQuizCategory.currentQuizCategoryId
    const progressDetail = currentQuizProgress.currentQuizProgressMap.get(categoryId)

    let answerString = ""
    if (progressDetail && progressDetail.answerNum !== undefined && (categoryId === 1 || categoryId === 2)) {
        answerString = "正解：" + (progressDetail.answerNum + 1)
    }

    if (progressDetail && progressDetail.answerOrderCurrent && (categoryId === 3 || categoryId === 4)) {
        answerString = "正解順序："
        progressDetail.answerOrderCurrent.map((order, index, arr) => {
            answerString = answerString + (order + 1);
            if (index < arr.length - 1) {
                answerString = answerString + ","
            }
        })
    }

    const ticketString = "チケット残数：" + ticket.ticketInfo.ticketNum

    return presenter({answerString, ticketString, ...props})
}

const InformationArea: React.FC<ComponentProps> = container<ComponentProps, PresenterProps>(
    InformationAreaContainer,
    InformationAreaPresenter
)

export default InformationArea;
