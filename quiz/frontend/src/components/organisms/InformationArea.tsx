import React from 'react'
import { useCurrentQuizCategoryContext, useCurrentQuizProgressContext } from '../atoms/Context'
import { container, ContainerProps } from '../component'

type ComponentProps = {
}

type PresenterProps = {
    answerString: string
}

const InformationAreaPresenter: React.FC<PresenterProps> = ({answerString}) => (
    <div style={{marginTop: "3vh"}}>
        {answerString}
    </div>
)

const InformationAreaContainer: React.FC<ContainerProps<ComponentProps, PresenterProps>> = ({presenter, ...props}) => {
    const {currentQuizCategory} = useCurrentQuizCategoryContext()
    const {currentQuizProgress} = useCurrentQuizProgressContext()
    const categoryId = currentQuizCategory.currentQuizCategoryId
    const progressDetail = currentQuizProgress.currentQuizProgressMap.get(categoryId)

    let answerString = ""
    if (progressDetail && progressDetail.answerNum !== undefined && (categoryId === 1 || categoryId === 2)) {
        answerString = "正解：" + (progressDetail.answerNum + 1)
    }

    if (progressDetail && progressDetail.answerOrder && (categoryId === 3 || categoryId === 4)) {
        answerString = "正解順序："
        progressDetail.answerOrder!!.map((order, index, arr) => {
            answerString = answerString + (order + 1);
            if (index < arr.length - 1) {
                answerString = answerString + ","
            }
        })
    }

    return presenter({answerString, ...props})
}

const InformationArea: React.FC<ComponentProps> = container<ComponentProps, PresenterProps>(
    InformationAreaContainer,
    InformationAreaPresenter
)

export default InformationArea;
