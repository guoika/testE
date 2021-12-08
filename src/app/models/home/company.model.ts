export class CompanyModel {
    username: string;
    password: string;
    public get create(): Array<any> {
        return [
            {
                id: 'MediaURL',
                label: 'MediaURL',
                name: 'MediaURL',
                type: 'link'
            },
            {
                id: 'LegalName',
                label: 'Full name',
                name: 'LegalName',
                type: 'text'
            },
            {
                id: 'TradeName',
                label: 'Short name',
                name: 'TradeName',
                type: 'text'
            },
            {
                id: 'Email',
                label: 'Email',
                name: 'Email',
                type: 'text'
            },
            {
                id: 'Phone',
                label: 'Phone',
                name: 'Phone',
                type: 'text'
            },
            {
                id: 'Fax',
                label: 'Fax',
                name: 'Fax',
                type: 'text'
            },
            {
                id: 'TaxCode',
                label: 'Tax code',
                name: 'TaxCode',
                type: 'text'
            },
            {
                id: 'WebMediaURL',
                label: 'Website link',
                name: 'WebMediaURL',
                type: 'text'
            },
            {
                id: 'AddressLine1',
                label: 'Address',
                name: 'AddressLine',
                type: 'text'
            },
            {
                id: 'Owner',
                label: 'Owner',
                name: 'Owner',
                type: 'text'
            }
        ];
    }
}
