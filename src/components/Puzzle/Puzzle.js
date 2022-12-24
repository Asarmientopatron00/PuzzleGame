import { Box, Button } from '@mui/material';
import { Form, Formik } from 'formik';
import React from 'react'
import * as yup from 'yup';
import MyTextField from '../../shared/components/MyTextField';
import { mainStyles } from '../../shared/styles/mainStyles';

// function drawAndFind(word, matrix){
//   let box = '\n';
//   for(let x of matrix){
//    box+= '|'+x.join('|')+'|'+'\n'; 
//   }
//   console.log(box);
//   const sW = word.split('').map((w) => w.toUpperCase());
//   for (let i = 0; i < matrix.length; i++){
//     for (let j = 0; j < matrix[i].length; j++){
//       if(matrix[i][j] === sW[0]){
//         const h = horizontalS(sW, matrix, i, j);
//         const hInv = horizontalSInv(sW, matrix, i, j);
//         const v = verticalS(sW, matrix, i, j);
//         const vInv = verticalSInv(sW, matrix, i, j);
//         const dU = diagonalUp(sW, matrix, i, j);
//         const dUInv = diagonalUpInv(sW, matrix, i, j);
//         const dD = diagonalDown(sW, matrix, i, j);
//         const dDInv = diagonalDownInv(sW, matrix, i, j);
//         if(h || v || dU || dD || hInv || vInv || dUInv || dDInv){
//           return `La palabra ${word} comienza en [${i+1},${j+1}] y termina en [${h||hInv||v||vInv||dU||dUInv||dD||dDInv}]`
//         }
//       }
//     }
//   }
//   function horizontalS(sW, matrix, i, j){
//     const len = sW.length;
//     if(j+len > matrix[i].length) return false;
//     for(let a = 0; a < sW.length; a++){
//       if(matrix[i][j+a] !== undefined && sW[a] !== matrix[i][j+a]){
//         return false
//       }
//     }
//     return [i+1, j+sW.length];
//   }
//   function horizontalSInv(sW, matrix, i, j){
//     const len = sW.length;
//     if(j-len+1 < 0) return false;
//     for(let a = 0; a < sW.length; a++){
//       if(matrix[i][j-a] !== undefined && sW[a] !== matrix[i][j-a]){
//         return false
//       }
//     }
//     return [i+1, j-sW.length+2];
//   }
//   function verticalS(sW, matrix, i, j){
//     const len = sW.length;
//     if(i+len > matrix.length) return false;
//     for(let a = 0; a < sW.length; a++){
//       if(matrix[i+a][j] !== undefined && sW[a] !== matrix[i+a][j]){
//         return false
//       }
//     }
//     return [i+sW.length, j+1];
//   }
//   function verticalSInv(sW, matrix, i, j){
//     const len = sW.length;
//     if(i-len+1 < 0) return false;
//     for(let a = 0; a < sW.length; a++){
//       if(matrix[i-a][j] !== undefined && sW[a] !== matrix[i-a][j]){
//         return false
//       }
//     }
//     return [i-sW.length+2, j+1];
//   }
//   function diagonalUp(sW, matrix, i, j){
//     const len = sW.length;
//     if(i-len+1 < 0 || j+len > matrix[i].length) return false;
//     for(let a = 0; a < len; a++){
//       if(matrix[i-a][j+a] !== undefined && sW[a] !== matrix[i-a][j+a]){
//         return false;
//       }
//     }
//     return [i-len+2,j+len];
//   }
//   function diagonalUpInv(sW, matrix, i, j){
//     const len = sW.length;
//     if(i-len+1 < 0 || j-len+1 < 0) return false;
//     for(let a = 0; a < len; a++){
//       if(matrix[i-a][j-a] !== undefined && sW[a] !== matrix[i-a][j-a]){
//         return false;
//       }
//     }
//     return [i-len+2,j-len+2];
//   }
//   function diagonalDown(sW, matrix, i, j){
//     const len = sW.length;
//     if(i+len > matrix.length || j+len > matrix[i].length) return false;
//     for(let a = 0; a < len; a++){
//       if(matrix[i+a][j+a] !== undefined && sW[a] !== matrix[i+a][j+a]){
//         return false;
//       }
//     }
//     return [i+len,j+len];
//   }
//   function diagonalDownInv(sW, matrix, i, j){
//     const len = sW.length;
//     if(i+len > matrix.length || j-len+1 < 0) return false;
//     for(let a = 0; a < len; a++){
//       if(matrix[i+a][j-a] !== undefined && sW[a] !== matrix[i+a][j-a]){
//         return false;
//       }
//     }
//     return [i+len,j-len+2];
//   }
//   return 'That word does not exists in this matrix';
// };

// const word = 'Uav';
// const matrix = [
//   ['D', 'E', 'Y', 'Q', 'A', 'U', 'G'],
//   ['X', 'R', 'G', 'T', 'U', 'A', 'V'],
//   ['S', 'C', 'A', 'S', 'A', 'B', 'E'],
//   ['X', 'A', 'J', 'G', 'U', 'H', 'V'],
//   ['F', 'M', 'O', 'R', 'O', 'L', 'B'],
//   ['G', 'A', 'H', 'J', 'E', 'N', 'E']
// ];
// const matrix = [
//   [D, E, Y, Q, A, U, G],
//   [X, R, G, T, U, A, V],
//   [S, C, A, S, A, B, E],
//   [X, A, J, G, U, H, V],
//   [F, M, O, R, O, L, B],
//   [G, A, H, J, E, N, E]
// ]
// const res = drawAndFind(word, matrix)
// console.log(res);

const validationSchema = yup.object({
  matrix: yup.string().required('Required'),
  word: yup.string().required('Required').min(2, 'Must have at least two letters'),
}); 

const Puzzle = () => {
  const [matrix, setMatrix] = React.useState([]);
  const [response, setResponse] = React.useState('');

  const convertMatrix = (val, word) => {
    let newV = val.trim().replaceAll(' ','');
    newV = newV.substring(1, newV.length-1);
    newV = newV.split('[')
    newV.shift()
    const arr = newV.reduce((res, n) => {
      let a = n.replaceAll('],', '');
      a = a.replaceAll(']','');
      a = a.split(',');
      res.push(a);
      return res
    },[]);
    setMatrix(arr);
    const res = drawAndFind(word,arr);
    setResponse(res);
  }

  const drawAndFind = (word, matrix) => {
    const sW = word.split('').map((w) => w.toUpperCase());
    for (let i = 0; i < matrix.length; i++){
      for (let j = 0; j < matrix[i].length; j++){
        if(matrix[i][j] === sW[0]){
          const h = horizontalS(sW, matrix, i, j);
          const hInv = horizontalSInv(sW, matrix, i, j);
          const v = verticalS(sW, matrix, i, j);
          const vInv = verticalSInv(sW, matrix, i, j);
          const dU = diagonalUp(sW, matrix, i, j);
          const dUInv = diagonalUpInv(sW, matrix, i, j);
          const dD = diagonalDown(sW, matrix, i, j);
          const dDInv = diagonalDownInv(sW, matrix, i, j);
          if(h || v || dU || dD || hInv || vInv || dUInv || dDInv){
            return `Word ${word.toUpperCase()} starts in [${i+1},${j+1}] and ends in [${h||hInv||v||vInv||dU||dUInv||dD||dDInv}]`
          }
        }
      }
    }
    function horizontalS(sW, matrix, i, j){
      const len = sW.length;
      if(j+len > matrix[i].length) return false;
      for(let a = 0; a < sW.length; a++){
        if(matrix[i][j+a] !== undefined && sW[a] !== matrix[i][j+a]){
          return false
        }
      }
      return [i+1, j+sW.length];
    }
    function horizontalSInv(sW, matrix, i, j){
      const len = sW.length;
      if(j-len+1 < 0) return false;
      for(let a = 0; a < sW.length; a++){
        if(matrix[i][j-a] !== undefined && sW[a] !== matrix[i][j-a]){
          return false
        }
      }
      return [i+1, j-sW.length+2];
    }
    function verticalS(sW, matrix, i, j){
      const len = sW.length;
      if(i+len > matrix.length) return false;
      for(let a = 0; a < sW.length; a++){
        if(matrix[i+a][j] !== undefined && sW[a] !== matrix[i+a][j]){
          return false
        }
      }
      return [i+sW.length, j+1];
    }
    function verticalSInv(sW, matrix, i, j){
      const len = sW.length;
      if(i-len+1 < 0) return false;
      for(let a = 0; a < sW.length; a++){
        if(matrix[i-a][j] !== undefined && sW[a] !== matrix[i-a][j]){
          return false
        }
      }
      return [i-sW.length+2, j+1];
    }
    function diagonalUp(sW, matrix, i, j){
      const len = sW.length;
      if(i-len+1 < 0 || j+len > matrix[i].length) return false;
      for(let a = 0; a < len; a++){
        if(matrix[i-a][j+a] !== undefined && sW[a] !== matrix[i-a][j+a]){
          return false;
        }
      }
      return [i-len+2,j+len];
    }
    function diagonalUpInv(sW, matrix, i, j){
      const len = sW.length;
      if(i-len+1 < 0 || j-len+1 < 0) return false;
      for(let a = 0; a < len; a++){
        if(matrix[i-a][j-a] !== undefined && sW[a] !== matrix[i-a][j-a]){
          return false;
        }
      }
      return [i-len+2,j-len+2];
    }
    function diagonalDown(sW, matrix, i, j){
      const len = sW.length;
      if(i+len > matrix.length || j+len > matrix[i].length) return false;
      for(let a = 0; a < len; a++){
        if(matrix[i+a][j+a] !== undefined && sW[a] !== matrix[i+a][j+a]){
          return false;
        }
      }
      return [i+len,j+len];
    }
    function diagonalDownInv(sW, matrix, i, j){
      const len = sW.length;
      if(i+len > matrix.length || j-len+1 < 0) return false;
      for(let a = 0; a < len; a++){
        if(matrix[i+a][j-a] !== undefined && sW[a] !== matrix[i+a][j-a]){
          return false;
        }
      }
      return [i+len,j-len+2];
    }
    return 'That word does not exists in this matrix';
  };

  const makeMatrix = (matrix) => {
    return (
      matrix.map((row, index) => {
        return (
          <Box
            key={index}
            sx={{
              display: 'grid',
              gridTemplateColumns: `repeat(${matrix[0].length}, 1fr)`,
              width: 'fit-content',
            }}
          >
            {row.map((column, index) => {
              return (
                <Box 
                  key={index}
                  style={{
                    border: '1px solid black',
                    padding: 4,
                    minWidth: '20px',
                    textAlign: 'center'
                  }}  
                >
                  {column}
                </Box>
              )  
            })}
          </Box>
        );
      })
    );
  }
  
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          matrix: '',
          word: ''
        }}
        onSubmit={(data) => {
          convertMatrix(data.matrix, data.word);
        }}
      >
        {({initialValues, setFieldValue}) => (
          <Form noValidate autoComplete='off'>
            <Box sx={{padding: '40px 0px 20px 0px'}}>
              <Box
                fontSize={30}
                marginBottom={2}
                fontWeight={'bold'}>
                Puzzle Game
              </Box>
              <MyTextField
                label='Matrix'
                name='matrix'
                required
              />
              <MyTextField
                label='Searched Word'
                name='word'
                required
              />
            </Box>
            <Box sx={mainStyles.bottomsGroup}>
              <Button
                style={{...mainStyles.btnRoot, ...mainStyles.btnPrymary}}
                variant='contained'
                type='submit'>
                Play
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      {matrix.length > 0 && makeMatrix(matrix)}
      <Box sx={{marginTop: 3}}>
        {response}
      </Box>
    </Box>
  );
} 

export default Puzzle;