import React, {Component} from 'react';


class App extends Component{

    constructor(){
        super();
        this.state={
            titulo:'',
            descripcion: '',
            tareas: [],
            _id: ''
        };
        this.agregarTarea = this.agregarTarea.bind(this);
        this.escribiendo = this.escribiendo.bind(this);
    }


    agregarTarea(eve){

        if(this.state._id){
            fetch('/api/tareas/' + this.state._id, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html: 'Tarea Actualizada'});
                this.setState({titulo:'', descripcion:'', _id:''});
                this.obtenerTareas();
            })
            .catch(err => console.error(err));

        }else{
            fetch('/api/tareas',{
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html: 'Tarea Guardada'});
                this.setState({titulo:'', descripcion:''});
                this.obtenerTareas();
            })
            .catch(err => console.error(err));
        }

        eve.preventDefault();
    }

    componentDidMount(){
        this.obtenerTareas();
    }



    obtenerTareas(){
        fetch('/api/tareas')
            .then(res => res.json())
            .then(data => {
                this.setState({tareas: data});
                console.log(this.state.tareas);
            });
    }

    eliminarTarea(id){
        //console.log("Quiere eliminar: " + id);

        if(confirm("¿Esta seguro de eliminar?")){
            fetch('/api/tareas/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html: 'Tarea Eliminada'});
                this.obtenerTareas();
            })
            .catch(err => console.error(err));
        }

    }




    editarTarea(id){
        fetch('/api/tareas/' + id)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState({
                titulo: data.titulo,
                descripcion: data.descripcion,
                _id: data._id
            });
        })
        .catch(err => console.error(err));
    }






    escribiendo(eve){
        //console.log(eve.target.name + ": " +eve.target.value);
        const {name, value} = eve.target;

        this.setState({
            [name]: value
        });
    }

    render(){
        return(
            <div>
                {/* Navegacion*/}
                <nav className = "light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">Aplicación de Tareas</a>
                    </div>
                </nav>
                
                {/* Contenedor principal*/}
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.agregarTarea}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="titulo" onChange={this.escribiendo} type="text" placeholder="Titulo de la tarea" value={this.state.titulo}/>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="descripcion" onChange={this.escribiendo} placeholder="Descreipcion de la tarea" className="materialize-textarea" value={this.state.descripcion}></textarea>
                                            </div>
                                        </div>

                                        <button type="submit" className="btn light-blue darken-4">Enviar</button>

                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Titulo</th>
                                        <th>Descreipcion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tareas.map(tarea => {
                                            return (
                                                <tr key={tarea._id}>
                                                    <td>{tarea.titulo}</td>
                                                    <td>{tarea.descripcion}</td>
                                                    <td>
                                                        <button className="btn light-blue darken-4" onClick={() => this.eliminarTarea(tarea._id)}>
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button className="btn light-blue darken-4" onClick={()=> this.editarTarea(tarea._id)}>
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>

            </div>
        );
    }
}


export default App;