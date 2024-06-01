import { LogEntity, LogSeverityLevel } from "./log.entity"



describe('log.entity.ts LogEntity', () => { 

    const dataObj = {
        message: 'test-message',
        level: LogSeverityLevel.low,
        origin: 'log.entity.ts'
    }
    
    test('should create a LogEntity instance', () => { 
        
        const log = new LogEntity( dataObj )

        expect( log ).toBeInstanceOf( LogEntity );
        expect( log.message ).toBe( dataObj.message );
        expect( log.level ).toBe( dataObj.level );
        expect( log.origin ).toBe( dataObj.origin );
        expect( log.createdAt ).toBeInstanceOf( Date );

    });

    test('should create a LogEntity form json', () => { 

        const json = `{"message":"Service https://google.com working","level":"low","createdAt":"2024-06-01T17:44:30.520Z","origin":"check-service.ts"}`

        const log = LogEntity.fromJson( json );

        expect( log ).toBeInstanceOf( LogEntity );
        expect( log.message ).toBe( "Service https://google.com working" );
        expect( log.level ).toBe( "low" );
        expect( log.origin ).toBe( "check-service.ts" );
        expect( log.createdAt ).toBeInstanceOf( Date );
    });

    test('should create a LogEntity instance from object', () => { 

        const log = LogEntity.fromObject( dataObj )

        expect( log ).toBeInstanceOf( LogEntity );
        expect( log.message ).toBe( dataObj.message );
        expect( log.level ).toBe( dataObj.level );
        expect( log.origin ).toBe( dataObj.origin );
        expect( log.createdAt ).toBeInstanceOf( Date );

    })

})