/**
 * Created by Надежда on 03.04.2016.
 */
import React from 'react';
import Header from './header.jsx';
import Footer from './footer.jsx';
import Remark from './remark.jsx';
import CreatingButton from './creatingButton.jsx';
import RemarkForm from './remarkForm.jsx';

const Remarks = function ({store}) {
    //получили текущее состояние
    const {remarks, selectedRemark} = store.getState();
    return (
        <div>
            <Header />
            <main className="main">
                {remarks.map((remark, index) => {
                    return <Remark text={remark.text} store={store} index={index}/>;
                })}
                <RemarkForm text={""} formClass={"redo-form"} nameForm={"creating"} />
                <CreatingButton />
            </main>
            <Footer />
        </div>
    );
};

export default Remarks;
