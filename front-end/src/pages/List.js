import React, { useRef, useState } from 'react'
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from "material-table";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import { getCategories, deleteCategory } from '../services/categories'

const columns = [
    { title: "Nome", field: "name" },
    { title: "Descrição", field: "description" }
]

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: 30,
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing(1),
    },
    paper: {
        padding: theme.spacing(3, 2),
    },
    link: {
        textDecoration: 'none'
    }
}));

function List({
    history
}) {
    const [openDialog, setOpenDialog] = useState(false)
    const [idCatSelected, setIdCatSelected] = useState(undefined)
    const refTable = useRef(null)
    const classes = useStyles();

    function handleClickRemove(idCategory) {
        setIdCatSelected(idCategory)
        setOpenDialog(true)
    }

    function handleCloseDialog() {
        setOpenDialog(false)
    }

    async function handleDeleteCategory() {
        setOpenDialog(false)
        const isDeleted = await deleteCategory(idCatSelected)
        if (isDeleted)
            refTable.current.onQueryChange()
        else
            alert('Houve um erro ao excluir a categoria. Por favor tente novamente')

    }

    return (
        <div className={classes.root}>
            <Container >
                <Paper className={classes.paper}>
                    <div dir="rtl">
                        <Link to='/nova_categoria' className={classes.link}>
                            <Button variant="outlined" color="primary" className={classes.button}>
                                <AddIcon /> Adicionar
                            </Button>
                        </Link>
                    </div>
                    <MaterialTable
                        tableRef={refTable}
                        columns={columns}
                        data={query =>
                            new Promise((resolve, reject) => {
                                getCategories((query.page + 1), query.pageSize)
                                    .then(result => {
                                        resolve({
                                            data: result.data,
                                            page: query.page,
                                            totalCount: Number(result.headers['x-total-count']),
                                        })
                                    })
                            })
                        }
                        title="Categorias"
                        actions={[
                            {
                                icon: 'edit',
                                tooltip: 'Editar Categoria',
                                onClick: (event, rowData) => history.push({ pathname: `/categoria/${rowData.id}`, data: rowData })
                            },
                            rowData => ({
                                icon: 'delete',
                                tooltip: 'Excluir Categoria',
                                onClick: (event, rowData) => handleClickRemove(rowData.id)
                            })
                        ]}
                        options={{
                            actionsColumnIndex: -1
                        }}
                    />
                </Paper>
            </Container>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>Você irá apagar um item</DialogTitle>
                <DialogContent>
                    <DialogContentText>Tem certeza que deseja apagar?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color='primary' onClick={handleCloseDialog}>
                        Cancelar
                    </Button>
                    <Button color='primary' onClick={handleDeleteCategory}>
                        Apagar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default List