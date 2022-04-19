import {Button} from "react-bootstrap";
import {CSVLink} from "react-csv";

export default function ExcelDownloadComponent({headers, data, title, size}) {
    let day;
    if(data.length !== 0){
        if(title==="민원통계"){
            day = data[0].regist.slice(0,7).toString();
        }else{
            day = data[0].regist.toString();
        }
    }
    return (
        <div>{

                    <Button className={size + " btn btn-dark"}>
                        {(data !== null && data !== undefined && data.length !== undefined && data.length !== 0) ? (
                        <CSVLink
                            headers={headers}
                            data={data}
                            filename={title+"_"+day+".csv"}
                            target="_blank"
                        >
                            <span className="text-white">액셀 다운로드</span>
                        </CSVLink>
                            )
                        :
                            <span className="text-white">액셀 다운로드</span>
                        }

                    </Button>

        }</div>
    )
}