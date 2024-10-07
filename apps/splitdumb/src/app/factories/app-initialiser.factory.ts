import DataService from '@services/data.service';
import { SessionService } from '@services/session.service';

export default function appInitialiserFactory(sessionService: SessionService, dataService: DataService): () => Promise<void> {
    //return () => sessionService.initialiseSession().then(
    //    () => {
    //        console.log('Session initialised, initialising data');
    //        return dataService.initialiseData();
    //    },
    //    () => {
    //        console.log('Session not initialised, use needs to sign in');
    //    }
    //);
    return () => {
        return dataService.initialiseData();
    }
}
