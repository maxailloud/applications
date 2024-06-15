import { SessionService } from '@services/session.service';

export default function initializeAppFactory(sessionService: SessionService): () => Promise<void> {
    return () => sessionService.initialiseSession();
}
