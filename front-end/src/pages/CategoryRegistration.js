import React, { useState } from 'react'
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { addCategory, updateCategory } from '../services/categories'

const useStyles = makeStyles(theme => {
    return ({
        root: {
            marginTop: 50,
        },
        panel: {
            marginTop: 100,
        },
        iconCircle: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            borderRadius: '50%',
            padding: '0.5em',
            boxSizing: 'unset',
        },
        title: {
            fontSize: '2em',
            marginTop: 5,
        },
        containerForm: {
            display: 'flex',
            flexWrap: 'wrap',
            width: '100%'
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        },

        button: {
            margin: theme.spacing(1),
            marginRight: -theme.spacing(1)
        },
    })
}

)


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {children}
        </Typography>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useCategoryForm = (intialValue, callback) => {
    const [inputs, setInputs] = useState(intialValue)

    const handelInputChange = (event) => {
        event.persist()
        setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }))
    }

    const handleSubmit = (event) => {
        if (event)
            event.preventDefault()
        callback()
    }

    return {
        handleSubmit,
        handelInputChange,
        inputs
    }
}

function CategoryRegistration({
    location,
    history
}) {
    const classes = useStyles();
    const [tab, setTab] = useState(0)
    const { inputs, handelInputChange, handleSubmit } = useCategoryForm(location.data ? location.data : { name: '', description: '' }, sendData)

    function handleChange(event, newTab) {
        setTab(newTab);
    }

    async function sendData() {
        let isSuccess = false
        if (location.data) {
            isSuccess = await updateCategory(inputs)
            if (isSuccess)
                history.push('/categorias')
            else
                alert('Problema ao atualizar a categoria! Tente novamente.')
        }
        else {
            isSuccess = await addCategory(inputs)
            if (isSuccess)
                history.push('/categorias')
            else
                alert('Problema ao criar categoria! Tente novamente.')
        }

        console.log(inputs)
    }

    return (
        <React.Fragment>
            <Container className={classes.root}>
                {location.data &&
                    <AppBar position="static">
                        <Tabs value={tab} onChange={handleChange} aria-label="simple tabs example">
                            <Tab label="Informações" {...a11yProps(0)} />
                            <Tab label="Itens" {...a11yProps(1)} />
                        </Tabs>
                    </AppBar>}
                <TabPanel value={tab} index={0} className={classes.panel}>
                    <Grid container justify="center">
                        {location.data ? <EditIcon className={classes.iconCircle} /> : <AddIcon className={classes.iconCircle} />}
                    </Grid>
                    <Grid container justify="center">
                        <Typography className={classes.title}>{location.data ? 'Editar' : 'Criar'}  Categoria</Typography>
                    </Grid>
                    <Grid container justify="center">
                        <form className={classes.containerForm} autoComplete="off" onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="outlined-email-input"
                                        label="Nome"
                                        className={classes.textField}
                                        name="name"
                                        margin="normal"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        onChange={handelInputChange}
                                        value={inputs.name}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="outlined-email-input"
                                        label="Descrição"
                                        className={classes.textField}
                                        name="description"
                                        margin="normal"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        onChange={handelInputChange}
                                        value={inputs.description}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container justify="space-between">
                                <Button size="large" variant="outlined" color="primary" className={classes.button} onClick={() => history.goBack()}>
                                    Voltar
                                </Button>
                                <Button size="large" type='submit' variant="outlined" color="primary" className={classes.button}>
                                    {location.data ? 'Editar' : 'Adicionar'}
                                </Button>
                            </Grid>
                        </form>
                    </Grid>
                </TabPanel>

                <TabPanel value={tab} index={1} className={classes.panel}>
                    <Grid container justify="center" hidden={true}>
                        <Typography className={classes.title}>Em Construção</Typography>
                    </Grid>
                </TabPanel>
            </Container>
        </React.Fragment>
    )
}

export default CategoryRegistration