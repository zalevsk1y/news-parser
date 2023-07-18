import { STATUS_IDLE, STATUS_ACTIVE } from "@news-parser/entities/crons/constants";

export const SubmitButton = ({type,className}) => {
    const buttonName = type === STATUS_IDLE ? 'Start' : 'Stop';
    const buttonHandler = ()=>{
        switch (type) {
            case STATUS_IDLE:
                return;
            case STATUS_ACTIVE:
                return;
        }
    }
    return <button className={className} onClick={buttonHandler}>{buttonName}</button>
}