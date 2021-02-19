import firebase from 'firebase';

export default class fierbaseService {
    db = firebase.firestore();
    getData = (dataLoaded, dataRequested) => {
        // const db = firebase.firestore();
        dataRequested();
        let data = [];
        this.db.collection("banks").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const newItem = {...doc.data(), id: doc.id}
                data = [...data, newItem]
            });
            dataLoaded(data)
        });
    }

}