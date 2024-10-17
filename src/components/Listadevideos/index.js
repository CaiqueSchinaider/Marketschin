import Card from "../Card"
import Container from "../Container"
import styles from "./Listadevideos.module.css"
import produtosMock from "../../utils/produtosMock"
function Listadevideos() {
    return (
    <Container>
        {produtosMock.map((produtos)=> {
            return(
        <div>
            <a href={produtos.link}/>
        </div>    
            )
        })
        }
    </Container>
    )
}


export default Listadevideos 