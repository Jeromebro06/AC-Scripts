Lang = {
    ['de'] = {
        -- Interaktion
        ['interact'] = 'Drücke ~INPUT_CONTEXT~ um dein Geld zu waschen',
        
        -- Server Notifications - Errors
        ['error_occurred'] = 'Es ist ein Fehler aufgetreten',
        ['capacity_full'] = 'Die Geldwäsche ist bereits vollständig ausgelastet! (Max. 5 Prozesse)',
        ['missing_data'] = 'Du hast nicht alles erforderliche angegeben!',
        ['min_amount'] = 'Der Mindestbetrag beträgt 10$!',
        ['not_enough_black'] = 'Du hast nicht genug Schwarzgeld!',
        ['not_your_process'] = 'Dieser Prozess gehört dir nicht!',
        ['process_not_found'] = 'Prozess nicht gefunden',
        ['already_paid'] = 'Prozess wurde bereits ausgezahlt',
        ['not_completed'] = 'Prozess ist noch nicht abgeschlossen',
        
        -- Server Notifications - Success
        ['deposit_success'] = 'Du hast erfolgreich %s$ Schwarzgeld eingezahlt!',
        ['withdraw_success'] = 'Du hast erfolgreich %s$ sauberes Geld erhalten!',
        ['wash_complete'] = 'Die Waschmaschine in der Schwarzgeldwäsche piepst!',
        
        -- Webhook Messages
        ['webhook_started_title'] = '💰 Geldwäsche gestartet',
        ['webhook_started_desc'] = 'Ein Spieler hat einen Geldwäsche-Prozess gestartet',
        ['webhook_completed_title'] = '✅ Geldwäsche abgeschlossen',
        ['webhook_completed_desc'] = 'Ein Spieler hat sauberes Geld abgehoben',
        ['webhook_player'] = '👤 Spieler',
        ['webhook_black_money'] = '💵 Schwarzgeld',
        ['webhook_fee'] = '📊 Gebühr',
        ['webhook_clean_money'] = '✅ Sauberes Geld',
        ['webhook_wait_time'] = '⏱️ Wartezeit',
        ['webhook_received_amount'] = '💰 Erhaltener Betrag',
        ['webhook_original_amount'] = '📝 Original Betrag',
        ['webhook_minutes'] = 'Minuten',
        
        -- Database Messages
        ['db_processes_loaded'] = 'Moneywash Prozesse geladen',
        ['db_no_processes'] = 'Keine aktiven Moneywash Prozesse gefunden',
        
        -- Blip
        ['blip_name'] = 'Moneywash',
    },
    
    ['en'] = {
        -- Interaction
        ['interact'] = 'Press ~INPUT_CONTEXT~ to wash your money',
        
        -- Server Notifications - Errors
        ['error_occurred'] = 'An error has occurred',
        ['capacity_full'] = 'The money wash is already fully booked! (Max. 5 processes)',
        ['missing_data'] = 'You have not provided all required information!',
        ['min_amount'] = 'The minimum amount is $10!',
        ['not_enough_black'] = 'You do not have enough black money!',
        ['not_your_process'] = 'This process does not belong to you!',
        ['process_not_found'] = 'Process not found',
        ['already_paid'] = 'Process has already been paid out',
        ['not_completed'] = 'Process is not yet completed',
        
        -- Server Notifications - Success
        ['deposit_success'] = 'You have successfully deposited $%s black money!',
        ['withdraw_success'] = 'You have successfully received $%s clean money!',
        ['wash_complete'] = 'The washing machine in the money wash is beeping!',
        
        -- Webhook Messages
        ['webhook_started_title'] = '💰 Money Wash Started',
        ['webhook_started_desc'] = 'A player has started a money wash process',
        ['webhook_completed_title'] = '✅ Money Wash Completed',
        ['webhook_completed_desc'] = 'A player has withdrawn clean money',
        ['webhook_player'] = '👤 Player',
        ['webhook_black_money'] = '💵 Black Money',
        ['webhook_fee'] = '📊 Fee',
        ['webhook_clean_money'] = '✅ Clean Money',
        ['webhook_wait_time'] = '⏱️ Wait Time',
        ['webhook_received_amount'] = '💰 Received Amount',
        ['webhook_original_amount'] = '📝 Original Amount',
        ['webhook_minutes'] = 'Minutes',
        
        -- Database Messages
        ['db_processes_loaded'] = 'Money wash processes loaded',
        ['db_no_processes'] = 'No active money wash processes found',
        
        -- Blip
        ['blip_name'] = 'Money Wash',
    },
    
    ['fr'] = {
        -- Interaction
        ['interact'] = 'Appuyez sur ~INPUT_CONTEXT~ pour laver votre argent',
        
        -- Server Notifications - Errors
        ['error_occurred'] = 'Une erreur s\'est produite',
        ['capacity_full'] = 'Le blanchiment d\'argent est déjà complet! (Max. 5 processus)',
        ['missing_data'] = 'Vous n\'avez pas fourni toutes les informations requises!',
        ['min_amount'] = 'Le montant minimum est de 10$!',
        ['not_enough_black'] = 'Vous n\'avez pas assez d\'argent sale!',
        ['not_your_process'] = 'Ce processus ne vous appartient pas!',
        ['process_not_found'] = 'Processus introuvable',
        ['already_paid'] = 'Le processus a déjà été payé',
        ['not_completed'] = 'Le processus n\'est pas encore terminé',
        
        -- Server Notifications - Success
        ['deposit_success'] = 'Vous avez déposé avec succès %s$ d\'argent sale!',
        ['withdraw_success'] = 'Vous avez reçu avec succès %s$ d\'argent propre!',
        ['wash_complete'] = 'La machine à laver dans le blanchiment d\'argent bipe!',
        
        -- Webhook Messages
        ['webhook_started_title'] = '💰 Blanchiment commencé',
        ['webhook_started_desc'] = 'Un joueur a commencé un processus de blanchiment',
        ['webhook_completed_title'] = '✅ Blanchiment terminé',
        ['webhook_completed_desc'] = 'Un joueur a retiré de l\'argent propre',
        ['webhook_player'] = '👤 Joueur',
        ['webhook_black_money'] = '💵 Argent Sale',
        ['webhook_fee'] = '📊 Frais',
        ['webhook_clean_money'] = '✅ Argent Propre',
        ['webhook_wait_time'] = '⏱️ Temps d\'Attente',
        ['webhook_received_amount'] = '💰 Montant Reçu',
        ['webhook_original_amount'] = '📝 Montant Original',
        ['webhook_minutes'] = 'Minutes',
        
        -- Database Messages
        ['db_processes_loaded'] = 'Processus de blanchiment chargés',
        ['db_no_processes'] = 'Aucun processus de blanchiment actif trouvé',
        
        -- Blip
        ['blip_name'] = 'Blanchiment d\'Argent',
    }
}