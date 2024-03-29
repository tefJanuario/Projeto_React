import { useState } from "react";
import { useParams } from "react-router-dom";
import { alterarPassageiro, getPassageiro } from "../Services/Passageiro";

export function PassageiroEditar () {
    const [ passageiro, setPassageiros ] = useState<any>();
    const params = useParams();
    console.log(params);
  
    if (!passageiro) {
      getPassageiro(parseInt(params.id||'', 10))
        .then(res => setPassageiros(res.data));
    }

    const onSubmit = (evt: any) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const data = Object.fromEntries(formData);

    alterarPassageiro({
        id: passageiro.id,
        nome: data.nome.toString(),
        CodVoo: parseInt(data.CodVoo.toString()) 
    });
   
  }

  return (
    <form onSubmit={onSubmit}>
        <div>
            <span>Nome</span>
            <input type="text" name="nome" defaultValue={passageiro?.nome}/>
        </div>
        <div>
        <span>Comp. Aerea</span>
        <select name="CodVoo" id="CodVoo">
          <option value="">Selecione</option>
          <option value="22">GOL</option>
          <option value="2">LATAM</option>
          <option value="3">AZUL</option>
          <option value="23">TESTE</option>
        </select>
        </div>
            <input type="submit" value="Salvar" />
    </form>
  )
}