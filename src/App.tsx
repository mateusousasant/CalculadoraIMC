import { useState } from 'react';
import styles from './App.module.css';
import imgHeader from './assets/powered.png';
import {levels, calcImc, Level} from './helpers/imc';
import { GridItem } from './components/GridItem';
import lefArrowImagem from '../src/assets/leftarrow.png'

const App = ()=>{

  const [height, setHeigth] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null);

  const handleCalculateButton = () =>{
    if (height && weight){
      setToShow(calcImc(height, weight));
    }else{
      alert('Digite todos os campos');
    }
  }

  const handleBackButton = () => {
    setToShow(null);
    setHeigth(0);
    setWeight(0);
  }

  return (
    <div className={styles.main}>

      <header className={styles.headerContainer}>
        <img src={imgHeader} alt="" width={140} />
      </header>

      <div className={styles.container}>
        <section className={styles.leftSide}>
          <h1>Calcule o seu IMC</h1>
          <p>IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoa</p>

          <input type="number"
            placeholder='Digite sua altura, em Metros'
            value={height > 0 ? height : ''}
            onChange={e => setHeigth(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />
          <input type="number"
            placeholder='Digite seu peso em KG'
            value={weight > 0 ? weight : ''}
            onChange={e => setWeight(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />

          <button onClick={handleCalculateButton} disabled={toShow ? true : false}>Calcular </button>
        </section>
        <section className={styles.rightSide}>
          {!toShow &&          
            <div className={styles.grid}>
              {levels.map((item, key)=>(
                <GridItem key={key} item={item}/>
              ))}  
            </div>
          }
          {toShow &&
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                <img src={lefArrowImagem} alt="" width={25}/>
              </div>
              <GridItem item={toShow} />
            </div>
          }        
        </section>
      </div>

    </div>
  )
}
export default App