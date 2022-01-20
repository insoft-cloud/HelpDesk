
interface ButtonInterface{
    url? : string;
    btnName : string | undefined;
    btnClassName? : string | undefined;
}

export default class ButtonModel implements ButtonInterface{
    public url?: string;
    public btnName : string | undefined;
    public btnClassName? : string | undefined;
}

