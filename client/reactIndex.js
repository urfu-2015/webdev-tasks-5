var App = new React.createClass({
    getInitialState () {
        return {tasks: []}
    },

    handleAddSubmit (data) {
        var tasks = this.state.tasks;
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: data,
            success: function (data) {
                this.setState({tasks: data.tasks});
            }.bind(this),
            error: function (xhr, status, err) {
                this.setState({data: tasks});
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    handleDeleteSubmit (data) {
        var tasks = this.state.tasks;
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'DELETE',
            data: data,
            success: function (data) {
                this.setState({tasks: data.tasks});
            }.bind(this),
            error: function (xhr, status, err) {
                this.setState({data: tasks});
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    handleEditSubmit (data) {
        var tasks = this.state.tasks;
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'PUT',
            data: data,
            success: function (data) {
                this.setState({tasks: data.tasks});
            }.bind(this),
            error: function (xhr, status, err) {
                this.setState({data: tasks});
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    loadTasksFromServer () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({tasks: data.tasks});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
        var parElement = document.querySelector('.pull-and-refresh');
        parElement.classList.add('pull-and-refresh-hidden');
        parElement.style.height = '0px';
        document.querySelector('.pull-and-refresh__loader').style.display = 'none';
    },

    componentDidMount () {
        this.loadTasksFromServer();
        setInterval(this.loadTasksFromServer, this.props.pollInterval);
    },

    handlePullAndRefresh () {
        setInterval(this.loadTasksFromServer, 2000);
    },

    render () {
        return (
            <div id="content">
                <PullAndRefresh/>
                <Header                    
                    onResreshEvent={this.handlePullAndRefresh}
                />
                <List
                    tasks={this.state.tasks}
                    onDeleteSubmit={this.handleDeleteSubmit}
                    onEditSubmit={this.handleEditSubmit}
                />
                <AddContainer onAddSubmit={this.handleAddSubmit}/>
            </div>
        );
    }
});

var PullAndRefresh = new React.createClass({
    render () {
        return (
            <div className="pull-and-refresh pull-and-refresh-hidden">
                <img src="loader.gif" className="pull-and-refresh__loader"/>
            </div>
        );
    }
});

var Header = new React.createClass({
    getInitialState() {
        return {
            dir: 'none',
            startX: undefined,
            startY: undefined,
            distX: 0,
            distY: 0,
            deltaTime: 0,
            startTime: undefined
        };
    },

    handleTouchStart (event) {
        this.state.dir = 'none';
        this.state.startX = event.changedTouches[0].pageX;
        this.state.startY = event.changedTouches[0].pageY;
        this.state.startTime = new Date().getTime();
        this.state.distX = 0;
        this.state.distY = 0;
    },

    handleTouchMove (event) {
        var touchObj = event.changedTouches[0];
        this.state.distX = touchObj.pageX - this.state.startX;
        this.state.distY = touchObj.pageY - this.state.startY;

        var parElement = document.querySelector('.pull-and-refresh');
        var oldHeight =  parseFloat(window.getComputedStyle(parElement).height);
        var maxRefreshBlockHeight = 150;
        var loader = document.querySelector('.pull-and-refresh__loader');

        if (Math.abs(this.state.distX) < Math.abs(this.state.distY)) {
            if (this.state.distY > 0) {
                this.state.dir = 'down';
                var newHeight = Math.min(oldHeight + this.state.distY, maxRefreshBlockHeight);
                parElement.style.height = newHeight + 'px';
                parElement.classList.remove('pull-and-refresh-hidden');
                
                if (newHeight === maxRefreshBlockHeight) {
                    loader.style.display = 'block';
                    this.props.onResreshEvent();
                }
            } else {
                this.state.dir = 'up';
                loader.style.display = 'none';
                parElement.style.height = '0px';
                parElement.classList.add('pull-and-refresh-hidden');
            }
        }
    },

    render () {
        return (
            <div 
                className="header"
                onTouchStart={this.handleTouchStart}
                onTouchMove={this.handleTouchMove}
                onTouchEnd={this.handleTouchEnd} 
            >
                <p className="header-text">TODO-хи!!!</p>
            </div>
        );
    }
});

var Task = new React.createClass({
    getInitialState () {
        return {
            dir: 'none',
            startX: undefined,
            startY: undefined,
            distX: 0,
            distY: 0,
            threshold: 150,
            restraint: 100,
            allowedTime: 500,
            deltaTime: 0,
            startTime: undefined,
            maxDeleteBttnWidth: 60,
            isForm: false,
            text: this.props.text,
            id: this.props.id
        };
    },

    handleTouchStart (event) {
        this.state.dir = 'none';
        this.state.startX = event.changedTouches[0].pageX;
        this.state.startY = event.changedTouches[0].pageY;
        this.state.startTime = new Date().getTime();
        this.state.distX = 0;
        this.state.distY = 0;

        this.deleteTask(event);
    },

    deleteTask (event) {
        var touchedElement = event.target;
        var isTap = event.targetTouches.length === 1;
        var isDeleteElement = touchedElement.id.indexOf('delete') != -1;
        if (isTap && isDeleteElement) {
            var id = touchedElement.id.split('_')[1];
            var task = document.querySelector('#task_' + id);
            this.state.maxDeleteBttnWidth = parseFloat(window.getComputedStyle(task).width) * 0.3;
            this.props.onDeleteEvent({id: id});
        }
    },

    handleTouchMove (event) {
        var touchObj = event.changedTouches[0];
        this.state.distX = touchObj.pageX - this.state.startX;
        this.state.distY = touchObj.pageY - this.state.startY;

        var id = event.target.id.split('_')[1];
        var deleteButton = document.querySelector('#delete_' + id);
        var buttonWidth = parseFloat(window.getComputedStyle(deleteButton).width);

        if (Math.abs(this.state.distX) > Math.abs(this.state.distY)) {
            if (this.state.distX < 0) {
                this.state.dir = 'left';
                deleteButton.classList.remove('task__delete-hidden');
                var widthWithDist = buttonWidth + Math.abs(this.state.distX);
                var newWidth = Math.min(widthWithDist, this.state.maxDeleteBttnWidth);
                deleteButton.style.width = newWidth + 'px';
            } else {
                this.state.dir = 'right';
                var newWidth = Math.max(0, buttonWidth - this.state.distX);
                var halfOfMaxWidth = this.state.maxDeleteBttnWidth / 2;
                if (newWidth > 0 && newWidth < halfOfMaxWidth) {
                    deleteButton.classList.add('task__delete-hidden');
                }
                deleteButton.style.width = newWidth + 'px';
            }
        }
    },

    handleTouchEnd (event) {
        this.state.deltaTime = new Date().getTime() - this.state.startTime;

        var element = event.target;
        var isTheSame = this.state.dir === 'none' && !this.state.distX && !this.state.distY;
        var toEdit = element.id.indexOf('task') != -1 ||
                    element.id.indexOf('text') != -1;
        if (isTheSame && toEdit && this.props.canShowForm) {
            this.state.isForm = true;
            this.props.onShowFormEvent({value: true});
        }
    },

    handleTextChange (event) {
        this.setState({text: event.target.value});
    },

    handleSubmit (event) {
        this.state.isForm = false;
        this.props.onShowFormEvent({value: false});
        event.preventDefault();
        var newText = this.state.text.trim();
        if (!newText) {
            alert('Нельзя добавить пустое задание');
            return;
        }        
        this.props.onEditEvent({id: this.state.id, text: newText});
    },

    render () {
        var taskInnerElement;
        if (this.state.isForm) {
            taskInnerElement =
                <form className="task__edit-form" onSubmit={this.handleSubmit}>
                    <input 
                        type="text"
                        value={this.state.text}
                        className="task__edit-text"
                        id={"edit-text_" + this.props.id}
                        onChange={this.handleTextChange}
                    />
                    <input 
                        type="submit"
                        value="Сохранить"
                        className="task__edit-submit"
                        id={"edit-submit_" + this.props.id}
                    />
                </form>
        } else {
            taskInnerElement =
                <div className="task_wrapper">
                    <div 
                        className="task__text"
                        id={"text_" + this.props.id}
                    >
                        {this.state.text}
                    </div>
                    <div
                        className="task__delete task__delete-hidden"
                        id={"delete_" + this.props.id}
                    >
                        <i className="fa fa-trash" id={"deleteImage_" + this.props.id}></i>
                    </div>
                </div>
        }
        return (
            <div
                className="task"
                id={"task_" + this.props.id}
                onTouchStart={this.handleTouchStart}
                onTouchMove={this.handleTouchMove}
                onTouchEnd={this.handleTouchEnd}                
            >
                {taskInnerElement}
            </div>
        )
    }
});

var List = new React.createClass({
    getInitialState () {
        return {hasForm: false}
    },

    handleShowForm (newValue) {
        this.setState({hasForm: newValue.value});
    },

    handleDeleteEvent (data) {
        this.props.onDeleteSubmit(data);
    },

    handleEditEvent (data) {
        this.hasForm = false;
        this.props.onEditSubmit(data);
    },

    render () {
        var tasksBlock;
        if (this.props.tasks.length > 0) {
            tasksBlock = this.props.tasks.map((task) => {
                return (
                    <Task
                        id={task.id} 
                        key={"key" + task.id}
                        text={task.text}
                        onDeleteEvent={this.handleDeleteEvent}
                        onEditEvent={this.handleEditEvent}
                        onShowFormEvent={this.handleShowForm}
                        canShowForm={!this.state.hasForm}
                    >
                    </Task>
                );
            });
        } else {
            tasksBlock = <div className="freedomMessage">
                            <p>
                                Вам ничего не надо делать.
                            </p>
                            <img src="dancingKitty.gif" className="dancingKitty"/>
                            <p>Бросьте себе новый вызов:</p>
                        </div>
        }
        
        return (
            <div className="task-list">{tasksBlock}</div>
        );
    }
});

var AddContainer = new React.createClass({
    getInitialState () {
        return { text: '' };
    },

    handleSubmit (event) {
        event.preventDefault();
        var newText = this.state.text.trim();
        if (!newText) {
            alert('Нельзя добавить пустое задание');
            return;
        }
        this.props.onAddSubmit({text: newText});
        this.setState({text: ''});
    },

    handleTextChange (event) {
        this.setState({text: event.target.value});
    },

    render () {
        return (
            <form className="add-form" onSubmit={this.handleSubmit}>
                <input 
                    className="text-to-add"
                    type="text"
                    value={this.state.text}
                    onChange={this.handleTextChange}
                  />
                <input className="butn-to-add" type="submit" value="Добавить"/>
            </form>
        );
    }
});

ReactDOM.render(
    <App url="/api/tasks" pollInterval={100000} />, document.querySelector('#page')
);
