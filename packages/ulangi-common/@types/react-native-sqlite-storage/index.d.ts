declare module "react-native-sqlite-storage" {

    // Type definitions for react-native-sqlite-storage 3.3
    // Project: https://github.com/andpor/react-native-sqlite-storage
    // Definitions by: Sergei Dryganets <https://github.com/dryganets>, Minh Loi <https://github.com/minhloi>
    // Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
    // TypeScript Version: 2.4

    export function openDatabase(params: DatabaseParams, success?: (db: SQLiteDatabase) => void, error?: (e: SQLError) => void): SQLiteDatabase;

    export function deleteDatabase(params: DatabaseParams, success?: () => void, error?: (err: SQLError) => void): Promise<void>;

    export type Location = 'default' | 'Library' | 'Documents';
    export interface DatabaseOptionalParams {
        createFromLocation?: number | string;
        // Database encryption pass phrase
        key?: string;
        readOnly?: boolean;
    }

    export interface DatabaseParams extends DatabaseOptionalParams {
        name: string;
        /**
       * Affects iOS database file location
       * 'default': Library/LocalDatabase subdirectory - NOT visible to iTunes and NOT backed up by iCloud
       * 'Library': Library subdirectory - backed up by iCloud, NOT visible to iTunes
       * 'Documents': Documents subdirectory - visible to iTunes and backed up by iCloud
       */
        location: Location;
    }

    export interface ResultSet {
        insertId: number;
        rowsAffected: number;
        rows: ResultSetRowList;
    }

    export interface ResultSetRowList {
        length: number;
        item(index: number): any;
    }

    export enum SQLErrors {
        UNKNOWN_ERR = 0,
        DATABASE_ERR = 1,
        VERSION_ERR = 2,
        TOO_LARGE_ERR = 3,
        QUOTA_ERR = 4,
        SYNTAX_ERR = 5,
        CONSTRAINT_ERR = 6,
        TIMEOUT_ERR = 7
    }

    export interface SQLError {
        code: number;
        message: string;
    }

    export type TransactionStatementCallback = (transaction: Transaction, resultSet: ResultSet) => void;
    export type TransactionStatementErrorCallback = (transaction: Transaction, error: SQLError) => void;
    export interface Transaction {
        executeSql(sqlStatement: string, arguments?: any[], callback?: TransactionStatementCallback, TransactionerrorCallback?: TransactionStatementErrorCallback ): Promise<[Transaction, ResultSet]>;
    }

    export type StatementCallback = (resultSet: ResultSet) => void;
    export type StatementErrorCallback = (error: SQLError) => void;

    export type TransactionCallback = (transaction: Transaction) => void;
    export type TransactionErrorCallback = (error: SQLError) => void;

    export interface SQLiteDatabase {
        transaction(scope: (tx: Transaction) => void, error?: TransactionErrorCallback, success?: TransactionCallback ): Promise<Transaction>;
        readTransaction(scope: (tx: Transaction) => void, error?: TransactionErrorCallback, success?: TransactionCallback): Promise<Transaction>;
        close(success?: () => void, error?: (err: SQLError) => void): Promise<void>;

        executeSql(statement: string, params?: any[], success?: StatementCallback, error?: StatementErrorCallback): Promise<[ResultSet]>;
        attach(nameToAttach: string, alias: string, success?: () => void, error?: (err: SQLError) => void): Promise<void>;
        dettach(alias: string, success?: () => void, error?: (err: SQLError) => void): Promise<void>;
        enablePromise(flag: boolean): void;
    }
}
