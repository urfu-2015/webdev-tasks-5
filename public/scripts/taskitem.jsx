'use strict';

(function () {

	window.TaskItem = React.createClass({
		getInitialState: function () {
			var taphandler = new TapHandler();
			taphandler.swipeLeftCB = this.onSwipeLeft;
			taphandler.swipeRightCB = this.onSwipeRight;
			return {
				taphandler: taphandler,
				edit: false,
				isDelete: false,
				id: this.props.id,
				text: this.props.text
			};
		},
		
		changeText: function (event) {
			this.setState({text: event.target.value});
		},
		
		updateTask: function (event) {
			changeTask(this.state.id, this.state.text);
		},
		
		onSwipeLeft: function () {
			this.setState({ isDelete: true });
		},
		
		onSwipeRight: function () {
			this.setState({ isDelete: false });
		},
		
		onClick: function () {
			this.setState({ edit: !this.state.edit });
		},
		
		onTextAreaClick: function (event) {
			event.stopPropagation();
		},
		
		onDeleteTask: function (event) {
			event.stopPropagation();
			deleteTask(this.state.id, (function () {
				this.props.deleteCB();
			}).bind(this));
		},
		
	   render: function () {
			var innerContent;
			if (this.state.edit) {
				innerContent =  (
					<div className='task-item__editor'>
						<textarea 
						className='task-item__editor__area' 
						value={this.state.text}
						onChange={this.changeText}
						onClick={this.onTextAreaClick}>
						</textarea>
						<br />
						<button 
						onClick={this.updateTask}
						className='task-item__save-button'>
							Сохранить
						</button>
					</div>
				);
			} else {
				innerContent = <div className='task-item__name'>{this.state.text}</div>;
			}
			var className = 'task-item task-item_edit_false task-item_delete_' +
				this.state.isDelete.toString();
			return (
				<div className={className}
					onTouchStart={this.state.taphandler.touchStart.bind(this.state.taphandler)}
					onTouchMove={this.state.taphandler.touchMove.bind(this.state.taphandler)}
					onTouchEnd={this.state.taphandler.touchEnd.bind(this.state.taphandler)}
					onClick={this.onClick}
					>
					{innerContent}
					<div className='task-item__delete-task'>
					<img 
					src='/images/delete.png'
					width='30' 
					height='30'
					onClick={this.onDeleteTask}
					/>
				</div>
				</div>
			);
		}
		
	});

})();