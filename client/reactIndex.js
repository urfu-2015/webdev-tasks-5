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
                alert(`Error: ${xhr.responseText}`);
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
                alert(`Error: ${xhr.responseText}`);
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
                alert(`Error: ${xhr.responseText}`);
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
        var parElement = this.refs.pullAndRefresh;
        parElement.changeHeight('0px');
        parElement.changeClassList('pull-and-refresh pull-and-refresh-hidden');
        parElement.changeImageDisplay('none');
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
                <PullAndRefresh ref="pullAndRefresh"/>
                <Header
                    onRefreshEvent={this.handlePullAndRefresh}
                    parBlock={this.refs.pullAndRefresh}
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
    getInitialState () {
        return {
            height: '0px',
            classList: 'pull-and-refresh pull-and-refresh-hidden',
            imageDisplay: 'none'
        }
    },

    changeHeight (newValue) {
        this.setState({height: newValue});
    },

    changeClassList (newValue) {
        this.setState({classList: newValue});
    },

    changeImageDisplay (newValue) {
        this.setState({imageDisplay: newValue});
    },

    render () {
        var divStyle = {
            height: this.state.height
        };
        var imgStyle = {
            display: this.state.imageDisplay
        };
        return (
            <div 
                className={this.state.classList}
                style={divStyle}
            >
                <img
                    src="loader.gif"
                    className="pull-and-refresh__loader"
                    style={imgStyle}
                />
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

        var parElement = this.props.parBlock;
        var oldHeight =  parseFloat(parElement.state.height);
        var maxRefreshBlockHeight = 150;

        if (Math.abs(this.state.distX) < Math.abs(this.state.distY)) {
            if (this.state.distY > 0) {
                this.state.dir = 'down';
                var newHeight = Math.min(oldHeight + this.state.distY, maxRefreshBlockHeight);
                parElement.changeHeight(newHeight + 'px');
                parElement.changeClassList('pull-and-refresh');
                
                if (newHeight === maxRefreshBlockHeight) {
                    parElement.changeImageDisplay('block');
                    this.props.onRefreshEvent();
                }
            } else {
                this.state.dir = 'up';
                parElement.changeImageDisplay('none');
                parElement.changeHeight('0px');
                parElement.changeClassList('pull-and-refresh pull-and-refresh-hidden');
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
            this.props.onDeleteEvent({id: this.state.id});
        }
    },

    handleTouchMove (event) {
        var touchObj = event.changedTouches[0];
        this.state.distX = touchObj.pageX - this.state.startX;
        this.state.distY = touchObj.pageY - this.state.startY;

        var id = this.state.id;
        var deleteButton = this.refs.deleteButton;
        var buttonWidth = parseFloat(deleteButton.state.width);

        if (Math.abs(this.state.distX) > Math.abs(this.state.distY)) {
            if (this.state.distX < 0) {
                this.state.dir = 'left';
                deleteButton.changeClassList('task__delete');
                var widthWithDist = buttonWidth + Math.abs(this.state.distX);
                var newWidth = Math.min(widthWithDist, this.state.maxDeleteBttnWidth);
                deleteButton.changeWidth(newWidth + 'px');
            } else {
                this.state.dir = 'right';
                var newWidth = Math.max(0, buttonWidth - this.state.distX);
                var halfOfMaxWidth = this.state.maxDeleteBttnWidth / 2;
                if (newWidth > 0 && newWidth < halfOfMaxWidth) {
                    deleteButton.changeClassList('task__delete task__delete-hidden');
                }
                deleteButton.changeWidth(newWidth + 'px');
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
            this.state.text = this.props.text;
            this.state.isForm = true;
            this.props.onShowFormEvent({value: true});
        }
    },

    handleTextChange (event) {
        this.setState({text: event.target.value});
    },

    handleSubmit (event) {
        this.props.onShowFormEvent({value: false});
        event.preventDefault();
        var newText = this.state.text.trim();
        this.props.onEditEvent({id: this.state.id, text: newText});
        this.state.isForm = false;
    },

    render () {
        var taskInnerElement;
        if (this.state.isForm) {
            taskInnerElement =
                <form className="task__edit-form" onSubmit={this.handleSubmit}>
                    <input
                        ref={(ref) => this.myTextInput = ref}
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
                        {this.props.text}
                    </div>
                    <DeleteButton
                        ref="deleteButton"
                        id={this.props.id}
                    />
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

var DeleteButton = new React.createClass({
    getInitialState () {
        return {
            classList: 'task__delete task__delete-hidden',
            width: '0px'
        }
    },

    changeClassList (newValue) {
        this.setState({classList: newValue});
    },

    changeWidth (newValue) {
        this.setState({width: newValue});
    },

    render () {
        var style = {
            width: this.state.width
        };
        return (
            <div
                className={this.state.classList}
                id={"delete_" + this.props.id}
                style={style}
            >
                <i className="fa fa-trash" id={"deleteImage_" + this.props.id}></i>
            </div>
        );
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
        /*if (!newText) {
            alert('Нельзя добавить пустое задание');
            return;
        }*/
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
