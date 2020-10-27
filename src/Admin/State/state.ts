export interface AdminState {
    userAnswers: any[];
}

export interface Question {
    ques: string;
    options: string[];
}

export interface QuizState {
    id: number;
    quizName: string;
    startDate: string;
    endDate: string
    totalQues: number;
    question: Question[];
}

export interface QuizResponse {
    quizName: string;
    response: UserResponse[];
}

export interface UserResponse {
    ques: string;
    answer: string;
}

export default function defaultAdminState(): AdminState {
    return (
        {
            userAnswers: []
        }
    );
}