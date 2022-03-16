<Grid container align={"center"} spacing={2}>
        <Grid item xs={12}> 
            <TextField
                label="shop_name"
                variant="outlined"
                defaultValue = {user.shop_name}
                inputProps={{ readOnly: true }}
                />
        </Grid>
        <Grid item xs={12}>
            <TextField
            label="Food Item Name"
            variant="outlined"
            defaultValue={user.item_name}
            inputProps={{ readOnly: true }}
            />
        </Grid>
        <Grid item xs={12}> 
            <TextField
                label="Item Price"
                variant="outlined"
                value={item_price}
                onChange={onChangeitem_price}
                />
        </Grid>
        <Grid item xs={12}> 
            <TextField
                label="Tags"
                variant="outlined"
                value={item_tag}
                onChange={onChangeitem_tag}
                />
        </Grid>
        <Grid item xs={12}> 
            <TextField
                label="Add-On"
                variant="outlined"
                value={item_addon}
                onChange={onChangeitem_addon}
                />
        </Grid>

        <Grid item xs={12}>
            <Button variant="contained" onClick={onSubmit}>
            UPDATE FOOD ITEM
            </Button>
        </Grid>
        </Grid>