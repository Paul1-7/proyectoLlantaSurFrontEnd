import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const DataTableContext = createContext();

function DataTableProvider({ children }) {
  const [disabledButtons, setDisabledButtons] = useState(null);
  const [dataRow, setDataRow] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dataDialog, setDataDialog] = useState('');

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = (id) => {
    setDataDialog(id);
  };

  const disableButton = (data) => {
    setDisabledButtons({ ...disabledButtons, [data.id]: true });
    setDataRow(data);
  };

  const setDataToDisabledButton = (data) => {
    let idsData = {};
    data.forEach(({ id }) => {
      idsData = { ...idsData, [id]: true };
    });
    setDisabledButtons(idsData);
  };

  const resetDataRow = () => {
    setDataRow(null);
  };

  const enableButton = (id) => {
    setDisabledButtons({ ...disabledButtons, [id]: false });
    setDataRow(null);
  };

  const data = {
    disableButton,
    enableButton,
    setDataToDisabledButton,
    disabledButtons,
    dataRow,
    resetDataRow,
    handleCloseDialog,
    handleOpenDialog,
    setOpenDialog,
    openDialog,
    dataDialog,
  };

  return <DataTableContext.Provider value={data}>{children}</DataTableContext.Provider>;
}

export { DataTableProvider };
export default DataTableContext;

DataTableProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
