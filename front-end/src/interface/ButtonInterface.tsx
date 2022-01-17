
interface ButtonInterface{
    url : string  | undefined;
    btnName : string | undefined;
    btnClassName : string | undefined;
}

export default class ButtonModel implements ButtonInterface{
    public url: string | undefined;
    public btnName : string | undefined;
    public btnClassName : string | undefined;
}