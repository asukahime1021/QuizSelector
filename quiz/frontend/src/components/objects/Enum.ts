class QuizType {
    static Rush: QuizType = new QuizType(1, "セレクトラッシュ", 4)
    static Spot: QuizType = new QuizType(2, "スポットlieト", 6)
    static Library: QuizType = new QuizType(3, "バラバライブラリー", 5)
    static Final: QuizType = new QuizType(4, "Final", 11)

    private id: number
    private name: string
    private optionNum: number

    constructor(id: number, name: string, optionNum: number) {
        this.id = id;
        this.name = name;
        this.optionNum = optionNum;
    }
    
    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getOptionNum(): number {
        return this.optionNum;
    }

    static getOptionNumById(id: number): number {
        const quizType: QuizType[] = this.values().filter((value => { value.getId() === id }))
        if (quizType.length !== 1) {
            return 0;
        }

        return quizType[0].getOptionNum();
    }

    static values(): QuizType[] {
        return [ QuizType.Rush, QuizType.Spot, QuizType.Library, QuizType.Final ];
    }
}

const QUIZ_RUSH = QuizType.Rush
const QUIZ_SPOT = QuizType.Spot
const QUIZ_LIBRARY = QuizType.Library
const QUIZ_FINAL = QuizType.Final

export { QUIZ_RUSH, QUIZ_SPOT, QUIZ_LIBRARY, QUIZ_FINAL, QuizType }
