import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { IoClose } from "react-icons/io5";
import { IoCreate } from "react-icons/io5";
import './App.css'

const App = () => {
  const [placa, setPlaca] = useState("");
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState("");
  const [cor, setCor] = useState("");
  const [itens, setItens] = useState([]);

  useEffect(() => {
    setAno(2023);
    setCor("vermelho");

  }, [])

  useEffect(() => {
    console.log(itens);
  }, [itens])

  useEffect(() => {
    console.log(placa);
  }, [placa])

  const cadastrar = () => {
    const regex = '[A-Z]{3}[0-9][0-9A-Z][0-9]{2}';


    if (placa === "" || modelo === "" || ano === "") {
      alert("Você deixou algum campo vazio");

    } else if (isNaN(ano)) {
      alert("Você deixou adicionou alguma letra no campo do ano");

    } else if(!placa.toUpperCase().match(regex) || placa.length >= 8){
      alert("Placa em invalida");

    } else {

      if (itens.length == 0) {
        setItens([{ placa: placa, modelo: modelo, ano: ano, cor: cor, id: itens.length }]);
      } else {
        setItens([...itens, { placa: placa, modelo: modelo, ano: ano, cor: cor, id: itens.length }]);
      }
    }

  }

  const limpar = () => {
    setPlaca("");
    setModelo("");
    setAno("");
    setCor("vermelho");
  }

  const deleteItem = (array) => {
    console.log(array)

    const itensFilter = itens.filter((item) => item.id !== array.id);
    console.log(itensFilter)

    setItens(itensFilter);
  }


  return (
    <>
      <div className="container">
        <h1 className="title">Cadastro de veículo</h1>

        <div className="boxInputs">
          <input type='text' placeholder='Placa' onChange={(e) => setPlaca(e.target.value)} value={placa} />
          <input type='text' placeholder='Modelo' onChange={(e) => setModelo(e.target.value)} value={modelo} />
        </div>

        <div className="boxInputs">
          <input type='text' placeholder='Ano' onChange={(e) => setAno(e.target.value)} value={ano} />

          <select onChange={(e) => setCor(e.target.value)} value={cor}>
            <option value={"vermelho"}>Vermelho</option>
            <option value={"azul"}>Azul</option>
            <option value={"amarelo"}>Amarelo</option>
          </select>
        </div>

        <div className="boxButtons">
          <button className="buttonClear" onClick={limpar}>Limpar</button>
          <button className="buttonRegister" onClick={cadastrar}>Cadastrar</button>
        </div>

        <table>
          <tbody>
            <tr>
              <th>Placa</th>
              <th>Modelo</th>
              <th>Ano</th>
              <th>Cor</th>
              <th>Ação</th>
            </tr>

            {itens.length === 0 ?
              <tr>
                <td>Placa</td>
                <td>Modelo</td>
                <td>Ano</td>
                <td>Cor</td>
                <td>Ação</td>
              </tr>
              : null}


            {itens.map((item, index) => (
              <tr key={item.placa + item.ano + item.modelo + index}>
                <td>{item.placa.toUpperCase()}</td>
                <td>{item.modelo}</td>
                <td>{item.ano}</td>
                <td>{item.cor}</td>
                <td className='containerAction'>
                  {/* <button>Editar</button>
                  <button>Apagar</button> */}
                  <div className='boxAction'>
                    <IoCreate className='icon edite'/>
                    <IoClose className='icon close' onClick={() => deleteItem({ id: item.id })}/>
                  </div>

                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </>
  )
}

export default App