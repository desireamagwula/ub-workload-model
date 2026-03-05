const AUTHORIZED_USERS = {
    // Regular faculty members
    faculty: [
        'aaren.guzman@ub.edu.bz',
        'acal@ub.edu.bz',
        'ashleymcfadzean@ub.edu.bz',
        'bronwen.forman@ub.edu.bz',
        'cdeshield@ub.edu.bz',
        'delmer.tzib@ub.edu.bz',
        'eaguilar@ub.edu.bz',
        'ikelly@ub.edu.bz',
        'gretchin.hernandez@ub.edu.bz',
        'kstuart@ub.edu.bz',
        'ktucker@ub.edu.bz',
        'mmckay@ub.edu.bz',
        'gmiddleton@ub.edu.bz',
        'gmucul@ub.edu.bz',
        'orlando.portillo@ub.edu.bz',
        'rmarfield@ub.edu.bz',
        'lisa.kile@ub.edu.bz',
        'tcoye@ub.edu.bz',
        'jineen.roches@ub.edu.bz',
        'karyn.thomas@ub.edu.bz',
        'alexander.evans@ub.edu.bz',
        'lmramirez@ub.edu.bz',
        'deborah.williams@ub.edu.bz',
        'emenigi.castro@ub.edu.bz',
        'vvillanueva@ub.edu.bz',
        'dfaber@ub.edu.bz',
        'ftorres@ub.edu.bz',
        'gtillett@ub.edu.bz',
        'jquiroz@ub.edu.bz',
        'jyoung@ub.edu.bz',
        'mhoare@ub.edu.bz',
        'mvairez@ub.edu.bz',
        'nilda.muschamp@ub.edu.bz',
        'ntun@ub.edu.bz',
        'omanzanero@ub.edu.bz',
        'rychun@ub.edu.bz',
        'tusher@ub.edu.bz',
        'tanycia.fritz@ub.edu.bz',
        'sandra.toro@ub.edu.bz',
        'melissa.mendez@ub.edu.bz',
        'mperera@ub.edu.bz',
        'tracey.augustine@ub.edu.bz',
        'amelia.lara@ub.edu.bz',
        'cmartinez@ub.edu.bz',
        'tdami@ub.edu.bz',
        'apascascio@ub.edu.bz',
        'christelle.wilson@ub.edu.bz',
        'jsaldivar@ub.edu.bz',
        'pcastillo@ub.edu.bz',
        'rlewis@ub.edu.bz',
        'sthiagarajan@ub.edu.bz',
        'xquetzal@ub.edu.bz',
        'eezeofor@ub.edu.bz',
        'kathrine.mendez@ub.edu.bz',
        'davila@ub.edu.bz',
        'syearwood@ub.edu.bz',
        'bwatler@ub.edu.bz',
        'kgeban@ub.edu.bz',
        'marceluz.geban@ub.edu.bz',
        'rpipersburgh@ub.edu.bz',
        'yasmine.andrews@ub.edu.bz',
        'merlin.star@ub.edu.bz',
        'cgladden@ub.edu.bz',
        'avekadavie.mano@ub.edu.bz',
        'djuan@ub.edu.bz',
        'stacey.tewes@ub.edu.bz',
        'galdana@ub.edu.bz',
        'isanchez@ub.edu.bz',
        'jdonis@ub.edu.bz',
        'mortega@ub.edu.bz',
        'acarrillo@ub.edu.bz',
        'cdiego@ub.edu.bz',
        'ecayetano@ub.edu.bz',
        'alex.carrillo@ub.edu.bz',
        'wani.morgan@ub.edu.bz',
        'joselito.chan@ub.edu.bz',
        'jjones@ub.edu.bz',
        'joselito.chan@ub.edu.bz',
        'lcarrillo@ub.edu.bz',
        'aarzu@ub.edu.bz',
        'aayoung@ub.edu.bz',
        'aramirez@ub.edu.bz',
        'abautista@ub.edu.bz',
        'aferguson@ub.edu.bz',
        'ajuarez@ub.edu.bz',
        'amilcar.umana@ub.edu.bz',
        'david.robertson@ub.edu.bz',
        'dgarcia@ub.edu.bz',
        'dlewis@ub.edu.bz',
        'jenny.olivas@ub.edu.bz',
        'kryan@ub.edu.bz',
        'laugustine@ub.edu.bz',
        'adrian.avilez@ub.edu.bz',
        'lavesh.gamez@ub.edu.bz',
        'mmedina@ub.edu.bz',
        'pmarroquin@ub.edu.bz',
        'solewis@ub.edu.bz',
        'jonathan.williams@ub.edu.bz',
        'vsylvester@ub.edu.bz',
        'alex.moralez@ub.edu.bz',
        'acano@ub.edu.bz',
        'kobinah.abdulsalim@ub.edu.bz',
        'canid.mendez@ub.edu.bz',
        'aaguilar@ub.edu.bz',
        'arogers@ub.edu.bz',
        'azelea.gillett@ub.edu.bz',
        'cacastillo@ub.edu.bz',
        'ddaniels@ub.edu.bz',
        'dyron.franco@ub.edu.bz',
        'egarcia@ub.edu.bz',
        'jake@ub.edu.bz',
        'jmagana@ub.edu.bz',
        'jpasos@ub.edu.bz',
        'jurbina@ub.edu.bz',
        'jvalladarez@ub.edu.bz',
        'klink@ub.edu.bz',
        'lthomas@ub.edu.bz',
        'melissa.robinson@ub.edu.bz',
        'mhua@ub.edu.bz',
        'psaqui@ub.edu.bz',
        'stephen.sangster@ub.edu.bz',
        'tthiagarajan@ub.edu.bz',
        'alarrieu@ub.edu.bz',
        'apennill@ub.edu.bz',
        'ksimplis@ub.edu.bz',
        'angela.flowers@ub.edu.bz',
        'folivera@ub.edu.bz',
        'lbevans@ub.edu.bz',
        'ganna.dortch@ub.edu.bz',
        'cjsho@ub.edu.bz',
        'iespadas@ub.edu.bz',
        'marie.candy@ub.edu.bz',
        'lcastillo@ub.edu.bz',
        'ann.matute@ub.edu.bz',
        'sharrie.gordon@ub.edu.bz',
        'melissa.young@ub.edu.bz',
        'michelle.hoare@ub.edu.bz',
        'pjlopez@ub.edu.bz',
        'yabubakar@ub.edu.bz',
        'dchiroma@ub.edu.bz',
        'diomar.salazar@ub.edu.bz',
        'inwachukwu@ub.edu.bz',
        'kuppala@ub.edu.bz',
        'obevans@ub.edu.bz',
        'li.hudson@ub.edu.bz',
        'uguerra@ub.edu.bz',
        'lthurton@ub.edu.bz',
        'melinda.guerra@ub.edu.bz',
        'chimezirim.amagwula@ub.edu.bz',
        'libtest@ub.edu.bz',
        '2018118456@ub.edu.bz',
        'luis.herrera@ub.edu.bz',
        'fay.garnett@ub.edu.bz',
        'kamryn.escalante@ub.edu.bz',
        'frank.hachmann@ub.edu.bz'
    ],
    
    // Chairs and their faculty (was previously deans)
    chairs: {
        '2018118456@ub.edu.bz': {
            name: 'Chimezirim Amagwula',
            role: 'Chair',
            faculty: [
                'chimezirim.amagwula@ub.edu.bz',
                'libtest@ub.edu.bz'
            ]
        },
        'uguerra@ub.edu.bz': {
            name: 'Mr. Ubaldimir Guerra',
            role: 'Chair',
            faculty: [
                'aaren.guzman@ub.edu.bz',
                'acal@ub.edu.bz',
                'ashleymcfadzean@ub.edu.bz',
                'bronwen.forman@ub.edu.bz',
                'cdeshield@ub.edu.bz',
                'delmer.tzib@ub.edu.bz',
                'eaguilar@ub.edu.bz',
                'ikelly@ub.edu.bz',
                'gretchin.hernandez@ub.edu.bz',
                'kstuart@ub.edu.bz',
                //'ktucker@ub.edu.bz',
                'orlando.portillo@ub.edu.bz',
                'rmarfield@ub.edu.bz',
                'lisa.kile@ub.edu.bz',
                'tcoye@ub.edu.bz',
                'jineen.roches@ub.edu.bz',
                'alexander.evans@ub.edu.bz',
                'lmramirez@ub.edu.bz'
            ]
        },
        'lcruz@ub.edu.bz': {
            name: 'Mr. Lugie Cruz',
            role: 'Chair',
            faculty: [
                'deborah.williams@ub.edu.bz',
                'emenigi.castro@ub.edu.bz',
                'vvillanueva@ub.edu.bz'
            ]
        },
        'jeneva.jones@ub.edu.bz': {
            name: 'Mrs. Jeneva Jones',
            role: 'Chair',
            faculty: [
                'dfaber@ub.edu.bz',
                'ftorres@ub.edu.bz',
                'gtillett@ub.edu.bz',
                'jquiroz@ub.edu.bz',
                'ktucker@ub.edu.bz',
                // 'jyoung@ub.edu.bz',
                // 'mhoare@ub.edu.bz',
                'mvairez@ub.edu.bz',
                'nilda.muschamp@ub.edu.bz',
                'ntun@ub.edu.bz',
                'omanzanero@ub.edu.bz',
                'rychun@ub.edu.bz',
                'gmucul@ub.edu.bz',
                'sandra.toro@ub.edu.bz',
                'melissa.mendez@ub.edu.bz',
                'mperera@ub.edu.bz',
                'karyn.thomas@ub.edu.bz',
                'tracey.augustine@ub.edu.bz',
                'mmckay@ub.edu.bz',
                'gmiddleton@ub.edu.bz'
            ]
        },
        'tdami@ub.edu.bz': {
            name: 'Mr. Timothy Dami',
            role: 'Chair',
            faculty: [
                'amelia.lara@ub.edu.bz',
                'cmartinez@ub.edu.bz',
                'omanzanero@ub.edu.bz',
                'mvairez@ub.edu.bz',
                'lisa.kile@ub.edu.bz',
                'aarzu@ub.edu.bz'
            ]
        },
        'davila@ub.edu.bz': {
            name: 'Dr. Deserie Avila',
            role: 'Chair',
            faculty: [
                'apascascio@ub.edu.bz',
                'christelle.wilson@ub.edu.bz',
                'jsaldivar@ub.edu.bz',
                'pcastillo@ub.edu.bz',
                'rlewis@ub.edu.bz',
                'sthiagarajan@ub.edu.bz',
                'xquetzal@ub.edu.bz',
                'stacey.tewes@ub.edu.bz',
                'eezeofor@ub.edu.bz',
                'kathrine.mendez@ub.edu.bz',
                'frank.hachmann@ub.edu.bz'
            ]
        },
        
        'syearwood@ub.edu.bz': {
            name: 'Ms. Sharret Yearwood',
            role: 'Chair',
            faculty: [
                'kgeban@ub.edu.bz',
                'marceluz.geban@ub.edu.bz',
                'rpipersburgh@ub.edu.bz',
                'yasmine.andrews@ub.edu.bz',
                'merlin.star@ub.edu.bz',
                'avekadavie.mano@ub.edu.bz',
                'cgladden@ub.edu.bz'
            ]
        },
        'mortega@ub.edu.bz': {
            name: 'Mr. Max Ortega',
            role: 'Chair',
            faculty: [
                'djuan@ub.edu.bz',
                'galdana@ub.edu.bz',
                'isanchez@ub.edu.bz',
                'jdonis@ub.edu.bz',
                'fay.garnett@ub.edu.bz'
            ]
        },
        'ecayetano@ub.edu.bz': {
            name: 'Mr. Emeri Cayetano',
            role: 'Chair',
            faculty: [
                'acarrillo@ub.edu.bz',
                'cdiego@ub.edu.bz',
                'jjones@ub.edu.bz',
                'joselito.chan@ub.edu.bz',
                'lcarrillo@ub.edu.bz',
                'wani.morgan@ub.edu.bz',
                'alex.carrillo@ub.edu.bz',
                'joselito.chan@ub.edu.bz'
            ]
        },
        'solewis@ub.edu.bz': {
            name: 'Mr. Steven Lewis',
            role: 'Chair',
            faculty: [
                'aarzu@ub.edu.bz',
                'aayoung@ub.edu.bz',
                'aramirez@ub.edu.bz',
                'abautista@ub.edu.bz',
                'aferguson@ub.edu.bz',
                'ajuarez@ub.edu.bz',
                'amilcar.umana@ub.edu.bz',
                'david.robertson@ub.edu.bz',
                'dgarcia@ub.edu.bz',
                'dlewis@ub.edu.bz',
                'jenny.olivas@ub.edu.bz',
                'kryan@ub.edu.bz',
                'laugustine@ub.edu.bz',
                'mmedina@ub.edu.bz',
                'pmarroquin@ub.edu.bz',
                'vsylvester@ub.edu.bz',
                'jonathan.williams@ub.edu.bz'
            ]
        },
        'acano@ub.edu.bz': {
            name: 'Mr. Anthony Cano',
            role: 'Chair',
            faculty: [
                'alex.moralez@ub.edu.bz',
                'stephen.sangster@ub.edu.bz',
                'aaguilar@ub.edu.bz',
                'arogers@ub.edu.bz',
                'azelea.gillett@ub.edu.bz',
                'cacastillo@ub.edu.bz',
                'ddaniels@ub.edu.bz',
                'dyron.franco@ub.edu.bz',
                'egarcia@ub.edu.bz',
                'jake@ub.edu.bz',
                'jmagana@ub.edu.bz',
                'jpasos@ub.edu.bz',
                'jurbina@ub.edu.bz',
                'jvalladarez@ub.edu.bz',
                'klink@ub.edu.bz',
                'lthomas@ub.edu.bz',
                'melissa.robinson@ub.edu.bz',
                'mhua@ub.edu.bz',
                'psaqui@ub.edu.bz',
                'tthiagarajan@ub.edu.bz',
                'canid.mendez@ub.edu.bz',
                'kobinah.abdulsalim@ub.edu.bz'
            ]
        },
        'angela.flowers@ub.edu.bz': {
            name: 'Angela Flowers',
            role: 'Chair',
            faculty: [
                'apennill@ub.edu.bz',
                'ksimplis@ub.edu.bz',
                'folivera@ub.edu.bz'
            ]
        },
        'cjsho@ub.edu.bz': {
            name: 'Caramyn Sho',
            role: 'Chair',
            faculty: [
                'ganna.dortch@ub.edu.bz',
                'iespadas@ub.edu.bz',
                'lcastillo@ub.edu.bz',
                'ann.matute@ub.edu.bz',
                'melissa.young@ub.edu.bz',
                'melinda.guerra@ub.edu.bz',
                'marie.candy@ub.edu.bz'
            ]
        },
        'pjlopez@ub.edu.bz': {
            name: 'Patricia Lopez',
            role: 'Chair',
            faculty: [
                'yabubakar@ub.edu.bz',
                'dchiroma@ub.edu.bz',
                'diomar.salazar@ub.edu.bz',
                'inwachukwu@ub.edu.bz',
                'kuppala@ub.edu.bz',
                'obevans@ub.edu.bz',
                'li.hudson@ub.edu.bz',
                'kamryn.escalante@ub.edu.bz'
            ]
        }
        
    },
    
    // Deans and their chairs (was previously chairs)
    deans: {
        'senriquez@ub.edu.bz': {
            name: 'Dr. Sherlene Enriquez Savery',
            role: 'Dean',
            faculty: [
                'tusher@ub.edu.bz',
                'lthurton@ub.edu.bz',
                'bwatler@ub.edu.bz'
            ]
        },
        'rpolonio@ub.edu.bz': {
            name: 'Mr. Roy Polonio',
            role: 'Dean',
            faculty: [
                'tdami@ub.edu.bz'
            ]
        },
        'aaguilar@ub.edu.bz': {
            name: 'Dr. Apolonio Aguilar',
            role: 'Dean',
            faculty: [
                'mortega@ub.edu.bz',
                'ecayetano@ub.edu.bz',
                'solewis@ub.edu.bz',
                'acano@ub.edu.bz'
            ]
        },
        'lthurton@ub.edu.bz': {
            name: 'Lydia Thurton',
            role: 'Dean',
            faculty: [
                'alarrieu@ub.edu.bz',
                'lbevans@ub.edu.bz',
                'pjlopez@ub.edu.bz'
            ]
        },
        'reference@ub.edu.bz': {
            name: 'Reference Dean',
            role: 'Dean',
            faculty: [
                'lcruz@ub.edu.bz',
                'mortega@ub.edu.bz',
                'ecayetano@ub.edu.bz',
                'solewis@ub.edu.bz',
                'acano@ub.edu.bz'
            ]
        },
        'bwatler@ub.edu.bz': {
            name: 'Dr. Bernard Watler',
            role: 'Dean',
            faculty: [
                'davila@ub.edu.bz',
                'syearwood@ub.edu.bz'
            ]
        },
        'tusher@ub.edu.bz': {
            name: 'Dr. Thisbe Usher',
            role: 'Dean',
            faculty: []
        }
    },
    
    // Super admin
    superAdmin: null,

    facultyMap: {
        'FEA': [
            'aaren.guzman@ub.edu.bz','acal@ub.edu.bz','ashleymcfadzean@ub.edu.bz','bronwen.forman@ub.edu.bz','cdeshield@ub.edu.bz','delmer.tzib@ub.edu.bz','eaguilar@ub.edu.bz','ikelly@ub.edu.bz','gretchin.hernandez@ub.edu.bz','kstuart@ub.edu.bz','ktucker@ub.edu.bz','mmckay@ub.edu.bz','gmucul@ub.edu.bz','orlando.portillo@ub.edu.bz','rmarfield@ub.edu.bz','lisa.kile@ub.edu.bz','uguerra@ub.edu.bz','tcoye@ub.edu.bz','jineen.roches@ub.edu.bz','karyn.thomas@ub.edu.bz','alexander.evans@ub.edu.bz','lmramirez@ub.edu.bz','deborah.williams@ub.edu.bz','emenigi.castro@ub.edu.bz','vvillanueva@ub.edu.bz','dfaber@ub.edu.bz','ftorres@ub.edu.bz','gtillett@ub.edu.bz','jeneva.jones@ub.edu.bz','jquiroz@ub.edu.bz','jyoung@ub.edu.bz','lcruz@ub.edu.bz','mhoare@ub.edu.bz','mvairez@ub.edu.bz','nilda.muschamp@ub.edu.bz','ntun@ub.edu.bz','omanzanero@ub.edu.bz','rychun@ub.edu.bz','tusher@ub.edu.bz','sandra.toro@ub.edu.bz','tanycia.fritz@ub.edu.bz','tracey.augustine@ub.edu.bz', 'mperera@ub.edu.bz','gmiddleton@ub.edu.bz','melissa.mendez@ub.edu.bz'
        ],
        'RLC': [
            'deborah.williams@ub.edu.bz','emenigi.castro@ub.edu.bz','vvillanueva@ub.edu.bz'
        ],
        'FMSS': [
            'amelia.lara@ub.edu.bz','cmartinez@ub.edu.bz','apascascio@ub.edu.bz','christelle.wilson@ub.edu.bz','jsaldivar@ub.edu.bz','pcastillo@ub.edu.bz','rlewis@ub.edu.bz','sthiagarajan@ub.edu.bz','xquetzal@ub.edu.bz','leon.palacio@ub.edu.bz','davila@ub.edu.bz','syearwood@ub.edu.bz','bwatler@ub.edu.bz','kgeban@ub.edu.bz','marceluz.geban@ub.edu.bz','rpipersburgh@ub.edu.bz','yasmine.andrews@ub.edu.bz','merlin.star@ub.edu.bz','cgladden@ub.edu.bz','avekadavie.mano@ub.edu.bz','stacey.tewes@ub.edu.bz','kathrine.mendez@ub.edu.bz','eezeofor@ub.edu.bz','frank.hachmann@ub.edu.bz'
        ],
        'FST': [
            'tdami@ub.edu.bz','djuan@ub.edu.bz','galdana@ub.edu.bz','isanchez@ub.edu.bz','jdonis@ub.edu.bz','mortega@ub.edu.bz','acarrillo@ub.edu.bz','cdiego@ub.edu.bz','ecayetano@ub.edu.bz','jjones@ub.edu.bz','joselito.chan@ub.edu.bz','lcarrillo@ub.edu.bz','aarzu@ub.edu.bz','aayoung@ub.edu.bz','aramirez@ub.edu.bz','abautista@ub.edu.bz','aferguson@ub.edu.bz','adrian.avilez@ub.edu.bz','ajuarez@ub.edu.bz','amilcar.umana@ub.edu.bz','aarzu@ub.edu.bz','david.robertson@ub.edu.bz','dgarcia@ub.edu.bz','dlewis@ub.edu.bz','jenny.olivas@ub.edu.bz','kryan@ub.edu.bz','laugustine@ub.edu.bz','mmedina@ub.edu.bz','pmarroquin@ub.edu.bz','solewis@ub.edu.bz','tdami@ub.edu.bz','vsylvester@ub.edu.bz','alex.moralez@ub.edu.bz','acano@ub.edu.bz','aaguilar@ub.edu.bz','arogers@ub.edu.bz','azelea.gillett@ub.edu.bz','cacastillo@ub.edu.bz','ddaniels@ub.edu.bz','dyron.franco@ub.edu.bz','egarcia@ub.edu.bz','jake@ub.edu.bz','jmagana@ub.edu.bz','jpasos@ub.edu.bz','jurbina@ub.edu.bz','jvalladarez@ub.edu.bz','klink@ub.edu.bz','lthomas@ub.edu.bz','melissa.robinson@ub.edu.bz','mhua@ub.edu.bz','psaqui@ub.edu.bz','stephen.sangster@ub.edu.bz','tthiagarajan@ub.edu.bz','chimezirim.amagwula@ub.edu.bz','2018118456@ub.edu.bz','luis.herrera@ub.edu.bz','libtest@ub.edu.bz','lavesh.gamez@ub.edu.bz','kobinah.abdulsalim@ub.edu.bz','canid.mendez@ub.edu.bz','fay.garnett@ub.edu.bz','alex.carrillo@ub.edu.bz','wani.morgan@ub.edu.bz','joselito.chan@ub.edu.bz','jonathan.williams@ub.edu.bz'
        ],
        'FHS': [
            'alarrieu@ub.edu.bz','apennill@ub.edu.bz','ksimplis@ub.edu.bz','angela.flowers@ub.edu.bz','folivera@ub.edu.bz','lbevans@ub.edu.bz','ganna.dortch@ub.edu.bz','cjsho@ub.edu.bz','iespadas@ub.edu.bz','lcastillo@ub.edu.bz','ann.matute@ub.edu.bz','sharrie.gordon@ub.edu.bz','melissa.young@ub.edu.bz','michelle.hoare@ub.edu.bz','pjlopez@ub.edu.bz','yabubakar@ub.edu.bz','dchiroma@ub.edu.bz','diomar.salazar@ub.edu.bz','inwachukwu@ub.edu.bz','kuppala@ub.edu.bz','obevans@ub.edu.bz','li.hudson@ub.edu.bz','lthurton@ub.edu.bz','melinda.guerra@ub.edu.bz','melinda.guerra@ub.edu.bz','kamryn.escalante@ub.edu.bz','marie.candy@ub.edu.bz'
        ]
    },
    deanFacultyMap: {
        'senriquez@ub.edu.bz': ['FEA', 'FMSS', 'FST', 'FHS', 'RLC'],
        'tusher@ub.edu.bz': 'FEA',
        'bwatler@ub.edu.bz': 'FMSS',
        'aaguilar@ub.edu.bz': 'FST',
        'lthurton@ub.edu.bz': 'FHS',
        'reference@ub.edu.bz': ['RLC', 'FST']
    }
};

// Function to check if a user is authorized
function isUserAuthorized(email) {
    return AUTHORIZED_USERS.faculty.includes(email) || 
           AUTHORIZED_USERS.deans[email] || 
           AUTHORIZED_USERS.chairs[email] || 
           email === AUTHORIZED_USERS.superAdmin;
}

// Function to get user role
function getUserRole(email) {
    if (email === AUTHORIZED_USERS.superAdmin) return 'Super Admin';
    if (AUTHORIZED_USERS.deans[email]) return 'Dean';
    if (AUTHORIZED_USERS.chairs[email]) return 'Chair';
    if (AUTHORIZED_USERS.faculty.includes(email)) return 'Faculty';
    return null;
}

// Function to get user's name
function getUserName(email) {
    if (AUTHORIZED_USERS.deans[email]) return AUTHORIZED_USERS.deans[email].name;
    if (AUTHORIZED_USERS.chairs[email]) return AUTHORIZED_USERS.chairs[email].name;
    return email.split('@')[0].replace(/\./g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

// Function to get faculty under a dean/chair
function getFacultyUnderUser(email) {
    if (AUTHORIZED_USERS.deans[email]) return AUTHORIZED_USERS.deans[email].faculty;
    if (AUTHORIZED_USERS.chairs[email]) return AUTHORIZED_USERS.chairs[email].faculty;
    return [];
} 