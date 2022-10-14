import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const DataTableContext = createContext();

const DataTableProvider = ({ children }) => {
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

  const enableButton = (id) => {
    setDisabledButtons({ ...disabledButtons, [id]: false });
    setDataRow(null);
  };

  const data = {
    disableButton,
    enableButton,
    disabledButtons,
    dataRow,
    handleCloseDialog,
    handleOpenDialog,
    setOpenDialog,
    openDialog,
    dataDialog
  };

  return <DataTableContext.Provider value={data}>{children}</DataTableContext.Provider>;
};

export { DataTableProvider };
export default DataTableContext;

DataTableProvider.propTypes = {
  children: PropTypes.node.isRequired
};
