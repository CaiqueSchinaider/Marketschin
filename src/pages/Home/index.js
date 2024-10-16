import Banner from "../../components/Banner";
import Card from "../../components/Card";
import Header from "../../components/Header";
import produtosMock from "../../utils/productMock"

function Home() {
  return (
    <>
    <Header />
    <Banner/>
  
  
  
      {produtosMock.map((produto) => {
        return (
          <div style={{width: "auto"}}> 
          <h1 style={{backgroundColor: "#18181874", borderRadius: "10px 10px 0px 0px", fontFamily:"Righteous, sans-serif", color: "white", width: "230px", 
            margin: "7px 42px -1px 40px", paddingTop: "px", boxShadow: "7px 13px 14px 0px #0000009c",  alignItems: "center", display:"flex", justifyContent: "center",alignItems:"center"}}> {produto.Categoria} </h1>
          
          <Card data={produto.produtos}/>
          </div>
        
        ) 
      }
      )}
    </>
  )}
  

        
       
  

    

export default Home;
