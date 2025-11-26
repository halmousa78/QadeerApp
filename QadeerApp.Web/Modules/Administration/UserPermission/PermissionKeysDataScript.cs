namespace QadeerApp.Administration;

[DataScript("Administration.PermissionKeys", Permission = PermissionKeys.Security)]
public class PermissionKeysDataScript : DataScript<IEnumerable<string>>
{
    private readonly IPermissionKeyLister permissionKeyLister;

    public PermissionKeysDataScript(IPermissionKeyLister permissionKeyLister)
    {
        // bump GroupKey to invalidate cached permission tree when keys change
        GroupKey = "Permissions_v3";
        Expiration = TimeSpan.Zero; // disable server cache to force fresh load
        this.permissionKeyLister = permissionKeyLister ?? throw new ArgumentNullException(nameof(permissionKeyLister));
    }

    protected override IEnumerable<string> GetData()
    {
        return permissionKeyLister.ListPermissionKeys(includeRoles: false);
    }
}
