"use client"
import { Veiculo } from '../../../../../hooks/useVeiculos';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from "@mui/icons-material/Save";
import Button from '@mui/material/Button';

import { createTheme, ThemeProvider } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    ochre: Palette['primary'];
  }

  interface PaletteOptions {
    ochre?: PaletteOptions['primary'];
  }
}
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    ochre: true;
  }
}

const theme = createTheme({
  palette: {
    ochre: {
      main: '#E3D026',
      light: '#E9DB5D',
      dark: '#A29415',
      contrastText: '#242105',
    },
  },
});

interface VeiculoFormProps {
  veiculo: Veiculo;
  isEditMode: boolean;
  editedVeiculo: Veiculo | null;
  handleSaveChanges: () => void;
  handleToggleEditMode: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Veiculo) => void;
  deleteVeiculo: () => void;
  handleEditVeiculo: (veiculo: Veiculo) => void;
};

const VeiculoForm: React.FC<VeiculoFormProps> = ({
  veiculo,
  isEditMode,
  editedVeiculo,
  handleSaveChanges,
  handleToggleEditMode,
  handleChange,
  deleteVeiculo,
  handleEditVeiculo,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <form className="flex flex-col justify-center items-center w-full h-full p-4 text-black">
        <div className="flex flex-col mb-2 w-full ml-[50%] sm:ml-[50%] md:ml-[50%] xl:ml-[50%]">
          <div className="flex flex-col mb-2">
            <label htmlFor="modelo" className="mb-1">Modelo:</label>
            {isEditMode && editedVeiculo?.id === veiculo.id ? (
              <input
                type="text"
                id="modelo"
                name="modelo"
                className="text-black border border-gray-300 rounded-md p-1 w-2/4"
                value={editedVeiculo?.modelo || ''}
                onChange={(e) => handleChange(e, "modelo")}
              />
            ) : (
              <input
                className="text-txt border border-gray-300 rounded-md p-1 w-2/4"
                type="text"
                value={`${veiculo.modelo}`}
                readOnly
              />
            )}
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="quilometragem" className="mb-1">Quilometragem:</label>
            {isEditMode ? (
              <input
                type="text"
                id="quilometragem"
                name="quilometragem"
                className="w-2/4 text-black border border-gray-300 rounded-md p-1"
                value={editedVeiculo?.quilometragem || ''}
                onChange={(e) => handleChange(e, "quilometragem")}
              />
            ) : (
              <input
                className="text-txt border border-gray-300 rounded-md p-1 w-2/4"
                type="text"
                value={`${veiculo.quilometragem} km`}
                readOnly
              />
            )}
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="placa" className="mb-1">Placa:</label>
            {isEditMode ? (
              <input
                type="text"
                id="placa"
                name="placa"
                className="w-2/4 text-black border border-gray-300 rounded-md p-1"
                value={editedVeiculo?.placa || ''}
                onChange={(e) => handleChange(e, "placa")}
              />
            ) : (
              <input
                className="text-txt border border-gray-300 rounded-md p-1 w-2/4"
                type="text"
                value={`${veiculo.placa}`}
                readOnly
              />
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="tipo_oleo" className="mb-1">Tipo de Óleo:</label>
            {isEditMode ? (
              <input
                type="text"
                id="tipo_oleo"
                name="tipo_oleo"
                className="w-2/4 text-black border border-gray-300 rounded-md p-1"
                value={editedVeiculo?.tipo_oleo || ''}
                onChange={(e) => handleChange(e, "tipo_oleo")}
              />
            ) : (
              <input
                className="text-txt border border-gray-300 rounded-md p-1 w-2/4"
                type="text"
                value={`${veiculo.tipo_oleo}`}
                readOnly
              />
            )}
          </div>
        </div>
        <div className="flex justify-around py-2 pl-2">
          {isEditMode && editedVeiculo?.id === veiculo.id ? (
            <div className="flex justify-around py-2">
              <Button onClick={handleSaveChanges} variant="contained" endIcon={<SaveIcon />} color='ochre' style={{ color: 'white' }} >
                Salvar
              </Button>
              <div className="ml-2">
                <Button onClick={handleToggleEditMode} variant="contained" color="ochre" style={{ color: 'white' }}>
                  Cancelar
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex justify-around py-2">
              <div className="mr-2">
                <Button onClick={() => handleEditVeiculo(veiculo)} variant="contained" color="ochre" style={{ color: 'white' }} >
                  Editar
                </Button>
              </div>
              <div>
                <Button onClick={deleteVeiculo} variant="contained" color="error" startIcon={<DeleteIcon />} className='bg-black'>
                  Excluir
                </Button>
              </div>
            </div>
          )}
        </div>

      </form>
    </ThemeProvider>
  );
};

export default VeiculoForm;
